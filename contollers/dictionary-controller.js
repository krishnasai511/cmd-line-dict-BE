const dict_hlpr = require('../helpers/dictionary-helper');



let self = module.exports = {


    //definitions
    defnOrexmple: async (type, word, exit) => {
        let wd_defns = await dict_hlpr.defnOrexmple(type, word);
        if (!wd_defns.length) {
            console.log('No data available');
        }
        else {
            console.log(`${type} are: ` + '\n');
            wd_defns.map((wd, i) => {
                console.log(i + 1 + '. ' + wd.text + '\n')
            })
            console.log(`\n`);
        }
        if (exit) {
            process.exit();
        }
    },


    //synonyms
    synOrant: async (type, word, exit) => {
        let data = await dict_hlpr.synOrant(word);
        if (data.length) {
            data.map(item => {
                if (item.relationshipType == type) {
                    if (item.words.length) {
                        console.log(`${type}s are:\n`)
                        item.words.map(wd => console.log(wd));
                        console.log(`\n`);
                    } else {
                        console.log(`No {type} are available`)
                    }
                }
            })
        } else {
            console.log("No data available!")
        }
        if (exit) {
            process.exit();
        }
    },



    //full dict
    fullDict: async (word) => {

        if (!word) {
            word = await dict_hlpr.getRandomWord();
        }
        console.log("Word is", word);
        // Display Word Definitions, Word Synonyms, Word Antonyms & Word Examples for a given word
        if (word) {
            await Promise.all([self.defnOrexmple('definitions', word), self.synOrant('synonym', word), self.synOrant('antonym', word), self.defnOrexmple('examples', word)])
            process.exit()
        }
    }

    //word game


}



