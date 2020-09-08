const { codeStatsRequest, logger } = require("../common/utils");
const retryer = require("../common/retryer");
const languageColor = require('../../themes/language-bar')
require("dotenv").config();

const fetcher = (variables) => {
  return codeStatsRequest(
    variables
  );
};

async function fetchTopLanguages(username) {
  if (!username) throw Error("Invalid username");

  let res = await retryer(fetcher, { login: username });

  if (res.data.errors) {
    logger.error(res.data.errors);
    throw Error(res.data.errors[0].message || "Could not fetch user");
  }

  let repoNodes = res.data.languages;

  // Remap nodes
  const list = []
  for (const key in repoNodes) {
    const item = repoNodes[key]
    list.push({
	  name: key,
	  color: languageColor[key] ? languageColor[key].color  : '#000000',
	  xp: item.xps,
	  recentXp: item.new_xps + item.xps
    })
  }

  repoNodes = list
    .filter((node) => {
      return node.xp > 0;
    })
    .sort((a, b) => b.xp - a.xp)
    .reduce((acc, prev) => {
      return {
        ...acc,
        [prev.name]: {
          name: prev.name,
          color: prev.color,
		  size: prev.xp,
		  recentSize: prev.recentXp
        },
      };
    }, {});

  const topLangs = Object.keys(repoNodes)
    // .slice(0, 5)
    .reduce((result, key) => {
      result[key] = repoNodes[key];
      return result;
    }, {});

  return topLangs;
}

module.exports = fetchTopLanguages;
