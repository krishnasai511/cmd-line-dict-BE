const dict_hlpr = require('../helpers/dictionary-helper');



let self = module.exports = {


    //definitions
    defnOrexmple: async (type, word, exit) => {
        try {
            let wd_defns = await dict_hlpr.defnOrexmple(type, word);
            if (wd_defns['error']) {
                console.log(`No ${type} available`);
            }
            else {
                if (type == 'examples') wd_defns = wd_defns.examples;
                console.log(`${type} are: ` + '\n');
                wd_defns.map((wd, i) => {
                    console.log(i + 1 + '. ' + wd.text + '\n');
                })
                console.log(`\n`);
            }
            if (exit) {
                process.exit();
            }
        } catch (err) {
            console.log("Error ", err);
        } finally {
            if (exit) {
                process.exit();
            }
        }
    },


    //synonyms
    synOrant: async (type, word, exit) => {
        try {
            let data = await dict_hlpr.synOrant(word);
            if (data.length) {
                data.map(item => {
                    if (item.relationshipType == type) {
                        if (item.words.length) {
                            console.log(`${type}s are:\n`);
                            item.words.map(wd => console.log(wd));
                            console.log(`\n`);
                        } else {
                            console.log(`No {type} are available`);
                        }
                    }
                })
            } else {
                console.log(`No ${type} available`);
            }
        } catch (err) {
            console.log("Error ", err);
        } finally {
            if (exit) {
                process.exit();
            }
        }
    },



    //full dict
    fullDict: async (word) => {
        try {
            if (!word) {
                word = await dict_hlpr.getRandomWord();
            }
            console.log("Word is", word);
            // Display Word Definitions, Word Synonyms, Word Antonyms & Word Examples for a given word
            if (word) {
                await Promise.all([self.defnOrexmple('definitions', word), self.synOrant('synonym', word), self.synOrant('antonym', word), self.defnOrexmple('examples', word)]);
                process.exit();
            }
        } catch (err) {
            console.log("Error ", err);
        } finally {
            process.exit();
        }
    },

    //word game
    //pending 
    playGame: async () => {
        //         The command should display a definition, a synonym or an antonym and ask the user to guess the word. 

        // Rules:

        // - If the correct word is entered, show success message
        // - Any synonyms of the word(expected answer) should be also be accepted as a correct answer.
        // - If incorrect word is entered, user should be given 3 choices:
        //     - (1) Try again
        //         Let the user try again.
        //     - (2) Hint
        //         Display a hint, and let the user try again. Hints could be:
        //             1. Display the word randomly jumbled (cat => atc, tac, tca)
        //             2. Display another definition of the word
        //             3. Display another antonym of the word
        //             4. Display another synonym of the word
        //     - (3) Quit

        //            Display the Word, Word Full Dict , and quit.

    }




}



