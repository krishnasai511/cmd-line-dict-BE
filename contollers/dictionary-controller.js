const dict_hlpr = require('../helpers/dictionary-helper');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


let self = module.exports = {


    //definitions
    defnOrexmple: async (type, word, exit, print) => {
        try {
            let wd_defns = await dict_hlpr.defnOrexmple(type, word);
            let wd_data = [];
            if (wd_defns['error']) {
                console.log(`No ${type} available`);
                return [];
            }
            else {
                if (type == 'examples') wd_defns = wd_defns.examples;
                wd_defns.map((wd, i) => {
                    i == 0 && print ? console.log(`${type} are: ` + '\n') : '';
                    if (print) {
                        console.log(i + 1 + '. ' + wd.text + '\n');
                    }
                    wd_data.push(wd.text);
                })
                console.log(`\n`);
                return wd_data;
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
    synOrant: async (type, word, exit, print) => {
        try {
            let data = await dict_hlpr.synOrant(word);
            let wd_data = [];
            if (data.length) {
                data.map(item => {
                    if (item.relationshipType == type) {
                        if (item.words.length) {
                            wd_data = item.words;
                            if (print) {
                                console.log(`${type}s are:\n`);
                                item.words.map(wd => console.log(wd));
                                console.log(`\n`);
                            }
                        } else {
                            console.log(`No {type} are available`);
                        }
                    }
                })
                return wd_data;
            } else {
                console.log(`No ${type} available`);
                return [];
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
            // Display Word Definitions, Word Synonyms, Word Antonyms & Word Examples for a given word
            if (word) {
                console.log(`**Full Dictionary Data of the word "${word}" **\n`);
                await Promise.all([self.defnOrexmple('definitions', word, false, true), self.synOrant('synonym', word, false, true), self.synOrant('antonym', word, false, true), self.defnOrexmple('examples', word, false, true)]);
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

        let word = await dict_hlpr.getRandomWord();
        let result = {
            data: [],
            type: ''
        };
        let flag;

        while (!result['data'].length) {
            result = await self.gameWord(word);
        }
        // console.log("result", result);



        if (result) {
            let guess_rand = Math.floor(Math.random() * (result.data.length));
            console.log(`Guess the word for the given ${result.type}`);
            console.log(`\n ${result.data[guess_rand]}`);
            let solutions = [];
            if (result.type !== 'synonym') {
                solutions = await self.synOrant("synonym", word);
            } else {
                solutions = result.data;
            }
            let random_syn = Math.floor(Math.random() * (solutions.length));
            let correct_ans = solutions[random_syn];
            // console.log("Correct Answer is ", correct_ans);


            rl.on('line', async (inp) => {
                if (inp == correct_ans) {
                    console.log("Success");
                    rl.close()
                } else {
                    let opt = inp;
                    if (opt == '1' && flag) {
                        console.log(`\nEnter word:\n`);
                        flag = false;
                    }
                    else if (opt == '2' && flag) {
                        let random_hint = Math.floor(Math.random() * (solutions.length));
                        random_hint = (random_hint == random_syn) ? random_hint - 1 : random_hint;
                        console.log(`Hint is ${solutions[random_hint]}`);
                        flag = false;
                    }
                    else if (opt == '3' && flag) {
                        console.log(`correct answer is ${correct_ans}\n`);
                        await self.fullDict(word)
                        flag = false;
                        rl.close()
                    }
                    else {
                        console.log(`Wrong Answer,Pick any of the given choices: \n 1.Try again \n 2.Hint \n 3.Quit the game\n`);
                        flag = true;
                    }
                }
            })


        }
    },

    gameWord: async (word) => {
        let random = Math.floor(Math.random() * (3));
        let result = [];
        let type = ["definition", "synonym", "antonym"];
        if (random == 0) {
            result = await self.defnOrexmple("definitions", word);
        } else if (random == 1) {
            result = await self.synOrant("synonym", word);
        } else {
            result = await self.synOrant("antonym", word);
        }

        return { data: result, type: type[random] };
    }
}


