# Extends the BlogPosting JSON-LD that jekyll-seo-tag emits with fields it does not support:
# articleSection (first category) and publisher (the site author as a Person).
require 'json'

Jekyll::Hooks.register :posts, :post_render do |post|
  next unless post.output_ext == '.html'

  author = post.site.config['author']
  about_url = "#{post.site.config['url']}/about/"

  post.output = post.output.gsub(%r{<script type="application/ld\+json">(.*?)</script>}m) do |block|
    data = begin
      JSON.parse(Regexp.last_match(1))
    rescue JSON::ParserError
      next block
    end
    next block unless data['@type'] == 'BlogPosting'

    section = Array(post.data['categories']).first
    data['articleSection'] = section if section
    if author.is_a?(Hash)
      data['publisher'] = { '@type' => 'Person', 'name' => author['name'], 'url' => about_url }
    end
    %(<script type="application/ld+json">#{JSON.generate(data)}</script>)
  end
end
