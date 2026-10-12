# Generates a page per tag at /tags/<slug>/ for tags used by at least MIN_POSTS posts,
# and exposes `site.tag_index` (all tags, sorted by name) to the /tags/ index page and post layout.
module TagPages
  MIN_POSTS = 2

  # Slugify would turn these into 'net', 'c' and 'asp-net'.
  SLUG_OVERRIDES = { '.net' => 'dotnet', 'c#' => 'csharp', 'asp.net' => 'aspnet' }.freeze

  class TagPage < Jekyll::PageWithoutAFile
    def initialize(site, entry)
      super(site, site.source, File.join('tags', entry['slug']), 'index.html')
      @data = {
        'layout' => 'tag',
        'title' => entry['name'],
        'tag' => entry['name'],
        'description' => "All #{entry['count']} blog posts tagged #{entry['name']} on #{site.config['title']}.",
        'permalink' => entry['url'],
        'image' => '/assets/images/blog-banner.png',
      }
      @content = ''
    end
  end

  class Generator < Jekyll::Generator
    safe true
    priority :low

    def generate(site)
      grouped = {}
      site.posts.docs.each do |post|
        Array(post.data['tags']).each do |tag|
          slug = SLUG_OVERRIDES.fetch(tag.to_s.downcase) { Jekyll::Utils.slugify(tag.to_s) }
          next if slug.empty?

          entry = (grouped[slug] ||= { 'name' => tag.to_s, 'slug' => slug, 'posts' => [] })
          entry['posts'] << post
        end
      end

      index = grouped.values.sort_by { |e| e['name'].downcase }
      index.each do |entry|
        entry['posts'].sort_by! { |p| p.date }.reverse!
        entry['count'] = entry['posts'].size
        entry['url'] = entry['count'] >= MIN_POSTS ? "/tags/#{entry['slug']}/" : nil
        site.pages << TagPage.new(site, entry) if entry['url']
      end

      site.config['tag_index'] = index
      site.config['tag_urls'] = index.each_with_object({}) { |e, h| h[e['name']] = e['url'] if e['url'] }
    end
  end
end
