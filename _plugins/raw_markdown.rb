# Keeps the original Markdown of each post available to templates as `post.raw_markdown`,
# because `post.content` is already rendered HTML. Used by llms-full.txt.
# Liquid image paths are replaced by absolute URLs so the text is usable outside Jekyll.
Jekyll::Hooks.register :posts, :pre_render do |post|
  base = post.site.config['url'].to_s
  post.data['raw_markdown'] = post.content.gsub(/\{\{\s*'([^']+)'\s*\|\s*relative_url\s*\}\}/) { "#{base}#{$1}" }
end
