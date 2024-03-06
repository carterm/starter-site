//@ts-check
const { UserConfig } = require("@11ty/eleventy");
const defaultConfig = require("@11ty/eleventy/src/defaultConfig");
const { parse } = require("csv-parse/sync");
const MarkdownIt = require("markdown-it");

module.exports = function (/** @type {UserConfig} **/ eleventyConfig) {
  // automatically turn .csv files into eleventy data
  eleventyConfig.addDataExtension("csv", (/** @type {string} */ contents) =>
    parse(contents, {
      columns: true,
      skip_empty_lines: true,
      cast: value =>
        ["true", "false"].includes(value) ? value === "true" : value //Boolean value parsing
    })
  );

  // Extend the default md library
  eleventyConfig.amendLibrary("md", (/** @type {MarkdownIt} */ mdLib) => {
    mdLib.options.linkify = true;
    mdLib.options.typographer = true;
  });

  // a special filter for converting md text to HTML
  eleventyConfig.addFilter("md", (/** @type {string} */ contents) => {
    const md = MarkdownIt({
      html: false,
      linkify: true,
      typographer: true,
      breaks: true
    });

    return md.renderInline(contents);
  });

  eleventyConfig.addPassthroughCopy({
    "src/root": "/",
    images: "/images/"
  });

  //Start with default config, easier to configure 11ty later
  const config = defaultConfig(eleventyConfig);

  // allow nunjucks templating in .html files
  config.htmlTemplateEngine = "njk";
  config.markdownTemplateEngine = "njk";
  config.templateFormats = ["html", "njk", "11ty.js", "md"];

  config.dir = {
    // site content pages
    input: "./pages",
    // site structure pages (path is realtive to input directory)
    data: "../src/_data",
    includes: "../src/_includes",
    // site final outpuut directory
    output: "_site"
  };

  return config;
};
