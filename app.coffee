fs           = require 'fs'
axis         = require 'axis'
rupture      = require 'rupture'
autoprefixer = require 'autoprefixer-stylus'
js_pipeline  = require 'js-pipeline'
css_pipeline = require 'css-pipeline'
records      = require 'roots-records'
collections  = require 'roots-collections'
s            = require 'underscore.string'
cleanUrls    = require 'clean-urls'
excerpt      = require 'html-excerpt'
moment       = require 'moment'
orderBy      = require 'lodash.orderby'
sortBy       = require 'lodash.sortby'
lodash       = require 'lodash'
algoliasearch = require 'algoliasearch'
client = algoliasearch("DAAAWM16TQ", "4711c5a5f317934bcfeb8bebd5f31ff6")
index = client.initIndex('freelisting')
freeJSON = './data/free_listing.json'
featuredJSON = './data/featured_listing.json'


monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]

module.exports =
  ignores: ['readme.md', '**/layout.*', '**/_*', '.gitignore', 'ship.*conf']

  locals:
    postExcerpt: (html, length, ellipsis) ->
      excerpt.text(html, length || 100, ellipsis || '...')
    dateFormat: (date, format) ->
      moment(date).format(format)
    slugifyText: (text) ->
      s.slugify(text)
    listing: (obj) ->
      orderBy obj, ['objectID', 'date'], ['desc', 'desc']
    sorting: (obj) ->
      sortBy obj, ['objectID', 'date']

  extensions: [
    records(
      freelisting: { file: "data/free_listing.json" }
      site: { file: "data/site.json" }
      files: { file: "data/files.json" }
      featuredlist:{file: "data/featured_listing.json"}
      freelistings:
        file: "data/free_listing.json"
        hook: (res) ->
              res.pages
        template: "views/_listing.jade"
        out: (c) -> "/list/#{s.slugify(c.title)}"
    ),
    collections(folder: 'posts', layout: 'post'),
    collections(folder: 'page', layout: 'post'),
    js_pipeline(files: 'assets/js/*.coffee'),
    css_pipeline(files: 'assets/css/*.styl')
  ]

  stylus:
    use: [axis(), rupture(), autoprefixer()]
    sourcemap: true

  'coffee-script':
    sourcemap: true

  jade:
    pretty: true
  server:
    clean_urls: true

  after:
      # objects = [];
    # fs.readFile listingJSON, 'utf8', (err, data) ->
    #   if err then err;
    #   obj = JSON.parse(data)
    #   str = obj.pages
    #   strr = obj.feature
    #   combine = str.concat(strr)
    #   result = JSON.stringify(combine)

    #   # console.log(result)
    #   objects.push(result)
    #   # console.log object
    #   index.saveObjects objects, (err, content) ->
    #     # console.log(objects)
    #   fs.writeFile 'listing.json', objects, (err) ->
    #     if err then err;
    #     console.log 'saved'

    fs.readFile freeJSON, 'utf8', (err, data) ->
      objects = [];
      obj = JSON.parse(data)
      str = obj.pages
      fs.readFile featuredJSON, 'utf8', (err, data) ->
        obj2 = JSON.parse(data)
        str2 = obj2.pages
        combine = str.concat(str2)
        result = JSON.stringify(combine)
        # console.log result
        objects.push(result)
        index.clearIndex (err, content) ->
          # console.log content
        index.saveObjects objects, (err, content) ->
          # console.log(objects)
        fs.writeFile 'listing.json', objects, (err) ->
          if err then err;
          console.log 'saved'
