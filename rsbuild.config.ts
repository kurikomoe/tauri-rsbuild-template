// rsbuild.config.ts
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginBabel } from '@rsbuild/plugin-babel';
import { pluginLess } from '@rsbuild/plugin-less';
import { pluginEslint } from "@rsbuild/plugin-eslint";

const isProduction = process.env.NODE_ENV === "production";

export default defineConfig({
    output: {
        polyfill: 'usage',
    },
    server: {
        port: 3000,
    },
    resolve: {
        alias: {
            "@assets": "./src/assets",
        },
    },
    tools: {
        rspack: {
            plugins:[],
        },
    },
    plugins: [
        pluginReact(),
        pluginLess(),
        pluginEslint({
            enable: true,
            eslintPluginOptions: {
                context: "./src",
                configType: "flat",
            },
        }),
    ].concat(!isProduction ? [] : [
        pluginBabel()
    ]),
});
