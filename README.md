<p align="center">
 <img width="100px" src="https://raw.githubusercontent.com/Aviortheking/codestats-readme/master/.github/logo.svg" align="center" alt="GitHub Readme Stats" />
 <h2 align="center">Code::Stats Readme</h2>
 <p align="center">Get dynamically generated Code::Stats stats on your readmes!</p>
</p>

# Features

- [Features](#features)
- [Profile Card](#profile-card)
- [History Card](#history-card)
- [Top Languages Card](#top-languages-card)
- [Common Options](#common-options)

# Profile Card

Copy paste this into your markdown content, and that's it. Simple!

Change the `?username=` value to your GitHub's username.

```md
[![Avior's code::stats stats](https://codestats-readme.avior.me/api?username=aviortheking)](https://github.com/Aviortheking/codestats-readme)
```

[![Avior's code::stats stats](https://codestats-readme.avior.me/api?username=aviortheking)](https://github.com/Aviortheking/codestats-readme)

### Options

| Option Name | Preview                                                                                         | Description                                                 |
| ----------- | ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| hide        | ![](https://codestats-readme.avior.me/api?username=aviortheking&hide=xp)                      | Hide specific line, ex: `&hide=xp` or `&hide=xp,recent_xp`  |
| show_icons  | ![](https://codestats-readme.avior.me/api?username=aviortheking&show_icons)                   | shows icons before each lines ex: `&show_icons`             |
| hide_rank   | ![](https://codestats-readme.avior.me/api?username=aviortheking&hide_rank)                    | hide the rank circle ex: `&hide_rank`                       |
| line_height | ![](https://codestats-readme.avior.me/api?username=aviortheking&line_height=45)               | change the line Height of each lines, ex: `&line_height=45` |
| icon_color  | ![](https://codestats-readme.avior.me/api?username=aviortheking&icon_color=123456&show_icons) | change the icons color, ex: `&icon_color=123456&show_icons` |
| text_color  | ![](https://codestats-readme.avior.me/api?username=aviortheking&text_color=123456)            | change the text colors, ex: `&text_color=123456`            |

# History Card

Shows your XP history as it's shown on your profile.

Copy-paste this code into your readme and change the links.

Endpoint: `api/history?username=Aviortheking`

```md
[![History](https://codestats-readme.avior.me/api/history/?username=Aviortheking)](https://github.com/aviortheking/codestats-readme)
```

[![History](https://codestats-readme.avior.me/api/history/?username=Aviortheking)](https://github.com/aviortheking/codestats-readme)

### Options

| Option Name    | Preview                                                                                                 | Description                                                                                                 |
| -------------- | ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| layout         | ![](https://codestats-readme.avior.me/api/history?username=Aviortheking&layout=horizontal)            | Change the layout to the horizontal one<br />ex: `&layout=horizontal`                                       |
| height         | ![](https://codestats-readme.avior.me/api/history?username=Aviortheking&height=400&layout=horizontal) | Change the height of the card _Only on horizontal layout_<br />ex: `&height=400`<br />Default: `300`        |
| width          | ![](https://codestats-readme.avior.me/api/history?username=Aviortheking&width=400)                    | Change the width of the card _Only on vertical layout_<br />ex: `&width=TypeScript`<br />Default: `500`     |
| title          | ![](https://codestats-readme.avior.me/api/history?username=Aviortheking&title=History)                | Change the title of the card<br />ex: `&title=History`                                                      |
| days_count     | ![](https://codestats-readme.avior.me/api/history?username=Aviortheking&days_count=7)                 | Change the number of days shown<br />ex: `&days_count=7` <br />Default: `14`                                |
| reverse_order  | ![](https://codestats-readme.avior.me/api/history?username=Aviortheking&reverse_order)                | Reverse the order of the days<br />ex: `&reverse_order`                                                     |
| hide           | ![](https://codestats-readme.avior.me/api/history?username=Aviortheking&hide=Typescript)              | Hide specifics languages and put them in Others<br />ex: `&hide=TypeScript`                                 |
| language_count | ![](https://codestats-readme.avior.me/api/history?username=Aviortheking&language_count=3)             | Change the number of languages shown before going to Others<br />ex: `&language_count=3`<br />defaults: `8` |
| text_color     | ![](https://codestats-readme.avior.me/api/history?username=Aviortheking&text_color=654321)            | change the text colors<br />ex: `&text_color=654321`                                                        |

# Top Languages Card

Top languages card shows user's top languages.

Copy-paste this code into your readme and change the links.

Endpoint: `api/top-langs?username=aviortheking`

```md
[![Top Langs](https://codestats-readme.avior.me/api/top-langs/?username=aviortheking)](https://github.com/aviortheking/codestats-readme)
```

[![Top Langs](https://codestats-readme.avior.me/api/top-langs/?username=aviortheking)](https://github.com/aviortheking/codestats-readme)

### Options

| Option Name    | Preview                                                                                        | Description                                                                                                 |
| -------------- | ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| hide           | ![](https://codestats-readme.avior.me/api/top-langs?username=aviortheking&hide=TypeScript)   | Hide Specific language<br />ex: `&hide=TypeScript` or `&hide=TypeScript,TypeScript%20(JSX)`                 |
| language_count | ![](https://codestats-readme.avior.me/api/top-langs?username=aviortheking&language_count=3)  | Change the number of languages shown before going to Others<br />ex: `&language_count=3`<br />defaults: `8` |
| card_width     | ![](https://codestats-readme.avior.me/api/top-langs?username=aviortheking&card_width=250)    | hide the rank circle<br />ex: `&card_width=600`<br />defaults: `300`                                        |
| layout         | ![](https://codestats-readme.avior.me/api/top-langs?username=aviortheking&layout=compact)    | make the layout more compact<br />ex: `&layout=compact`                                                     |
| text_color     | ![](https://codestats-readme.avior.me/api/top-langs?username=aviortheking&text_color=654321) | change the text colors<br />ex: `&text_color=654321`                                                        |

# Common Options

| Options Name  | Preview                                                                                | Description                                                                                                                |
| ------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| title_color   | ![](https://codestats-readme.avior.me/api?username=aviortheking&title_color=654321)  | Change the title color<br />ex: `&title_color=654321`                                                                      |
| bg_color      | ![](https://codestats-readme.avior.me/api?username=aviortheking&bg_color=654321)     | Change the background color<br />ex: `&bg_color=654321`                                                                    |
| hide_border   | ![](https://codestats-readme.avior.me/api?username=aviortheking&hide_border)         | Hide the border<br />ex: `&hide_border`                                                                                    |
| hide_title    | ![](https://codestats-readme.avior.me/api?username=aviortheking&hide_title)          | Hide the title<br />ex: `&hide_border`                                                                                     |
| theme         | ![](https://codestats-readme.avior.me/api?username=aviortheking&theme=radical)       | See [#themes](Themes)                                                                                                      |
| cache_seconds | ![](https://codestats-readme.avior.me/api?username=aviortheking&cache_seconds=86400) | set the cache header manually _(min: 1800, max: 86400)_<br />ex: `&cache_seconds=86400`<br />Default: `1800` or 30 minutes |

With inbuilt themes you can customize the look of the card without doing any [manual customization](#customization).

Use `?theme=THEME_NAME` parameter like so :-

```md
![Aviortheking's Code::Stats stats](https://codestats-readme.avior.me/api?username=aviortheking&show_icons=true&theme=nightowl)
```

![Aviortheking's Code::Stats stats](https://codestats-readme.avior.me/api?username=aviortheking&show_icons=true&theme=nightowl)

#### All inbuilt themes :-

dark, radical, merko, gruvbox, tokyonight, onedark, cobalt, synthwave, highcontrast, dracula

You can look at a preview for [all available themes](./themes/README.md) or checkout the [theme config file](./themes/index.js) & **you can also contribute new themes** if you like :D

---

### Quick Tip (Align your Cards)

You usually won't be able to layout the images side by side. To do that you can use this approach:

```md
<a href="https://github.com/aviortheking/codestats-readme">
  <img align="center" src="https://codestats-readme.avior.me/api?username=aviortheking" />
</a>
<a href="https://github.com/aviortheking/codestats-readme">
  <img align="center" src="https://codestats-readme.avior.me/api/top-langs/?username=aviortheking" />
</a>
```

## Deploy on your own Server


<details>

1. Build the Docker image `docker build . --tag your-tag`
2. run the Docker image `docker run your-tag`
3. Profit on the port 3000!

</details>

---

Contributions are welcomed! <3

Made with :heart: and Typescript.
