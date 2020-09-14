<p align="center">
 <img width="100px" src="https://res.cloudinary.com/anuraghazra/image/upload/v1594908242/logo_ccswme.svg" align="center" alt="GitHub Readme Stats" />
 <h2 align="center">Code::Stats Readme</h2>
 <p align="center">Get dynamically generated Code::Stats stats on your readmes!</p>
</p>

# Features

- [Top Languages Card](#top-languages-card)
- [Themes](#themes)
- [Customization](#customization)
- [Deploy Yourself](#deploy-on-your-own-vercel-instance)

# GitHub Stats Card

Copy paste this into your markdown content, and that's it. Simple!

Change the `?username=` value to your GitHub's username.

```md
[![Avior's code::stats stats](https://codestats-readme.vercel.app/api/top-langs?username=aviortheking)](https://github.com/Aviortheking/codestats-readme)
```

### Themes

With inbuilt themes you can customize the look of the card without doing any [manual customization](#customization).

Use `?theme=THEME_NAME` parameter like so :-

```md
![Anurag's github stats](https://codestats-readme.vercel.app/api/top-langs?username=aviortheking&theme=radical)
```

#### All inbuilt themes :-

dark, radical, merko, gruvbox, tokyonight, onedark, cobalt, synthwave, highcontrast, dracula

<img src="https://res.cloudinary.com/anuraghazra/image/upload/v1595174536/grs-themes_l4ynja.png" alt="GitHub Readme Stat Themes" width="600px"/>

You can look at a preview for [all available themes](./themes/README.md) or checkout the [theme config file](./themes/index.js) & **you can also contribute new themes** if you like :D

### Customization

You can customize the appearance of your `Stats Card` or `Repo Card` however you want with URL params.

#### Common Options:

- `title_color` - Card's title color _(hex color)_
- `text_color` - Body text color _(hex color)_
- `icon_color` - Icons color if available _(hex color)_
- `bg_color` - Card's background color _(hex color)_ **or** a gradient in the form of _angle,start,end_
- `theme` - name of the theme, choose from [all available themes](./themes/README.md)
- `cache_seconds` - set the cache header manually _(min: 1800, max: 86400)_

##### Gradient in bg_color

You can provide multiple comma separated values in bg_color option to render a gradient, the format of the gradient is :-

```
&bg_color=DEG,COLOR1,COLRO2,COLOR3...COLOR10
```

#### Language Card Exclusive Options:

- `hide` - Hide the languages specified from the card _(Comma separated values)_
- `hide_title` - _(boolean)_
- `layout` - Switch between two available layouts `default` & `compact`
- `card_width` - Set the card's width manually _(number)_

> :warning: **Important:**  
> Language names should be uri-escaped, as specified in [Percent Encoding](https://en.wikipedia.org/wiki/Percent-encoding)  
> (i.e: `c++` should become `c%2B%2B`, `jupyter notebook` should become `jupyter%20notebook`, etc.)

---

# Top Languages Card

Top languages card shows github user's top languages.

_NOTE: Top languages does not indicate your skill level or something like that, it's a metric of which languages you have the coded the most._

### Usage

Copy-paste this code into your readme and change the links.

Endpoint: `api/top-langs?username=anuraghazra`

```md
[![Top Langs](https://codestats-readme.vercel.app/api/top-langs/?username=aviortheking)](https://github.com/aviortheking/codestats-readme)
```

### Hide individual languages

You can use `?hide=language1,language2` parameter to hide individual languages.

```md
[![Top Langs](https://codestats-readme.vercel.app/api/top-langs/?username=aviortheking&hide=javascript,html)](https://github.com/aviortheking/codestats-readme)
```

### Compact Language Card Layout

You can use the `&layout=compact` option to change the card design.

```md
[![Top Langs](https://codestats-readme.vercel.app/api/top-langs/?username=aviortheking&layout=compact)](https://github.com/aviortheking/codestats-readme)
```

### Language Count 

You can change the default language count (5) using the `&language_count=10` option.

```md
[![Top Langs](https://codestats-readme.vercel.app/api/top-langs/?username=aviortheking&language_count=10)](https://github.com/aviortheking/codestats-readme)
```

### Demo

[![Top Langs](https://codestats-readme.vercel.app/api/top-langs/?username=aviortheking)](https://github.com/aviortheking/codestats-readme)

- Compact layout

[![Top Langs](https://codestats-readme.vercel.app/api/top-langs/?username=aviortheking&layout=compact)](https://github.com/aviortheking/codestats-readme)

---

### All Demos

- Themes

Choose from any of the [default themes](#themes)

![Anurag's github stats](https://codestats-readme.vercel.app/api/top-langs/?username=aviortheking&show_icons=true&theme=radical)

- Gradient

![Anurag's github stats](https://codestats-readme.vercel.app/api/top-langs/?username=aviortheking&bg_color=30,e96443,904e95&title_color=fff&text_color=fff)

- Customizing stats card

![Anurag's github stats](https://codestats-readme.vercel.app/api/top-langs/?username=aviortheking&title_color=fff&icon_color=79ff97&text_color=9f9f9f&bg_color=151515)

- Top languages

[![Top Langs](https://codestats-readme.vercel.app/api/top-langs/?username=aviortheking)](https://github.com/aviortheking/codestats-readme)

---

### Quick Tip (Align The Repo Cards)

You usually won't be able to layout the images side by side. To do that you can use this approach:

```md
<a href="https://github.com/aviortheking/codestats-readme">
  <img align="center" src="https://codestats-readme.vercel.app/api/top-langs/?username=aviortheking" />
</a>
<a href="https://github.com/aviortheking/codestats-readme">
  <img align="center" src="https://codestats-readme.vercel.app/api/top-langs/?username=aviortheking" />
</a>
```

## Deploy on your own Vercel instance


Since the GitHub API only allows 5k requests per hour, it is possible that my `https://codestats-readme.vercel.app/api` could hit the rate limiter. If you host it on your own Vercel server, then you don't have to worry about anything. Click on the deploy button to get started!

NOTE: Since [#58](https://github.com/anuraghazra/github-readme-stats/pull/58) we should be able to handle more than 5k requests and have no issues with downtime :D

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/anuraghazra/github-readme-stats)

<details>
 <summary><b> Guide on setting up Vercel  🔨 </b></summary>

1. Go to [vercel.com](https://vercel.com/)
1. Click on `Log in`  
   ![](https://files.catbox.moe/tct1wg.png)
1. Sign in with GitHub by pressing `Continue with GitHub`  
   ![](https://files.catbox.moe/btd78j.jpeg)
1. Sign into GitHub and allow access to all repositories, if prompted
1. Fork this repo
1. Go back to your [Vercel dashboard](https://vercel.com/dashboard)
1. Select `Import Project`  
   ![](https://files.catbox.moe/qckos0.png)
1. Select `Import Git Repository`  
   ![](https://files.catbox.moe/pqub9q.png)
1. Select root and keep everything as is (leave everything as is, just name it something, it can be anything you want)
   ![](https://files.catbox.moe/0ez4g7.png)
1. Click deploy, and you're good to go. See your domains to use the API!

</details>

---

![https://vercel.com](https://res.cloudinary.com/anuraghazra/image/upload/v1597827714/powered-by-vercel_1_ug4uro.svg)

Contributions are welcomed! <3

Made with :heart: and Typescript.
