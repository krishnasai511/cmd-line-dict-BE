const apiKey = process.env.API_KEY || "b972c7ca44dda72a5b482052b1f5e13470e01477f3fb97c85d5313b3c112627073481104fec2fb1a0cc9d84c2212474c0cbe7d8e59d7b95c7cb32a1133f778abd1857bf934ba06647fda4f59e878d164";
const apiHost = process.env.API_HOST || 'https://fourtytwowords.herokuapp.com';
const request = require('request');




module.exports = {
    //definitions
    defnOrexmple: (type, word) => {

        return new Promise((resolve, reject) => {
            request.get(`${apiHost}/word/${word}/${type}?api_key=${apiKey}`, (err, res) => {
                if (err) console.log(`Error in getting the word ${type}`, reject(err));
                else {
                    if (type == 'definitions') {
                        resolve(JSON.parse(res.body));
                    } else {
                        resolve(JSON.parse(res.body).examples);
                    }
                }
            })
        })
    },

    synOrant: (word) => {

        return new Promise((resolve, reject) => {
            request.get(`${apiHost}/word/${word}/relatedWords?api_key=${apiKey}`, (err, res) => {
                if (err) reject(err);
                resolve(JSON.parse(res.body));
            });
        })
    },

    getRandomWord: () => {
        return new Promise((resolve, reject) => {
            request.get(`${apiHost}/words/randomWord?api_key=${apiKey}`, (err, res) => {
                if (err) {
                    console.log('Error in fetching word');
                    reject(err);
                }
                resolve(JSON.parse(res.body).word);
            })
        })
    }


}




