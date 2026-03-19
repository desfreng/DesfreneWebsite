const minifier = require("html-minifier-next");
const fs = require("node:fs");
const path = require("node:path");

module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/robots.txt");
    eleventyConfig.addPassthroughCopy("src/sitemap.xml");
    eleventyConfig.addPassthroughCopy("src/favicon.svg");

    eleventyConfig.addFilter("cleanUrl", function (url) {
        if (!url) return "";

        return url
            .replace(/^https?:\/\//, "")
            .replace(/^www\./, "")
            .replace(/\/$/, "");
    });

    eleventyConfig.addTransform("htmlmin", async function (content) {
        if ((this.page.outputPath || "").endsWith(".html")) {
            const minified = await minifier.minify(content, {
                removeAttributeQuotes: true,
                collapseWhitespace: true,
                removeComments: true,
                removeEmptyAttributes: true,
                removeRedundantAttributes: true,
                minifySVG: true,
            });
            return minified;
        }
        return content;
    });

    return { dir: { input: "src", output: "_site" } };
};
