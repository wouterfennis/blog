# Adds width/height (prevents layout shift) and loading="lazy" (saves bandwidth) to local <img> tags
# in rendered pages and posts. The first image in the post content and the first post tile stay eager,
# because they are the most likely largest-contentful-paint element.
module ImageAttributes
  IMG_TAG = /<img\b[^>]*>/i

  module_function

  def process(site, output, in_post)
    content_start = output.index('class="post-content') || output.index('class="page-content')
    first_in_content_done = false
    first_tile_done = false

    output.gsub(IMG_TAG) do |tag|
      pos = Regexp.last_match.begin(0)
      src = tag[/\bsrc="([^"]+)"/i, 1]
      next tag unless src && src.start_with?('/') && !src.start_with?('//')

      extra = +''
      unless tag =~ /\bwidth=/i
        size = dimensions(site, src)
        extra << %( width="#{size[0]}" height="#{size[1]}") if size
      end

      unless tag =~ /\bloading=/i
        in_content = content_start && pos > content_start
        is_tile = tag.include?('post-tile__image')
        eager = false
        if in_content && in_post && !first_in_content_done
          first_in_content_done = true
          eager = true
        elsif is_tile && !first_tile_done
          first_tile_done = true
          eager = true
        end
        lazy = !eager && (is_tile || (in_content && in_post))
        extra << ' loading="lazy" decoding="async"' if lazy
      end

      extra.empty? ? tag : tag.sub(/\s*\/?>\z/) { |m| "#{extra}#{m}" }
    end
  end

  def dimensions(site, src)
    path = File.join(site.source, src.sub(/[?#].*\z/, '').sub(/\A#{Regexp.escape(site.baseurl.to_s)}/, ''))
    return nil unless File.file?(path)

    File.open(path, 'rb') { |f| read_size(f, File.extname(path).downcase) }
  rescue StandardError
    nil
  end

  def read_size(f, ext)
    case ext
    when '.png'
      f.read(16)
      f.read(8).unpack('NN')
    when '.gif'
      f.read(6)
      f.read(4).unpack('vv')
    when '.jpg', '.jpeg'
      jpeg_size(f)
    when '.webp'
      webp_size(f)
    end
  end

  def jpeg_size(f)
    f.read(2)
    loop do
      marker = f.read(2)
      return nil unless marker && marker.bytesize == 2

      type = marker.getbyte(1)
      len = f.read(2).unpack1('n')
      if [0xC0, 0xC1, 0xC2].include?(type)
        _precision, h, w = f.read(5).unpack('Cnn')
        return [w, h]
      end
      f.read(len - 2)
    end
  end

  def webp_size(f)
    header = f.read(30)
    case header[12, 4]
    when 'VP8 ' then header[26, 4].unpack('vv').map { |v| v & 0x3FFF }
    when 'VP8L'
      bits = header[21, 4].unpack1('V')
      [(bits & 0x3FFF) + 1, ((bits >> 14) & 0x3FFF) + 1]
    when 'VP8X'
      w = header[24, 3].unpack('C3')
      h = header[27, 3].unpack('C3')
      [(w[0] | (w[1] << 8) | (w[2] << 16)) + 1, (h[0] | (h[1] << 8) | (h[2] << 16)) + 1]
    end
  end
end

Jekyll::Hooks.register :pages, :post_render do |page|
  next unless page.output_ext == '.html'

  page.output = ImageAttributes.process(page.site, page.output, false)
end

Jekyll::Hooks.register :documents, :post_render do |doc|
  next unless doc.output_ext == '.html'

  doc.output = ImageAttributes.process(doc.site, doc.output, doc.collection.label == 'posts')
end
