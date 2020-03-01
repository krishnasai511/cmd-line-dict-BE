const dictionary = require('./contollers/dictionary-controller');



let dict_args = process.argv.splice(2);

// console.log('process words', dict_args);


if (dict_args.length) {

    let key = dict_args[0];
    let word = dict_args[1] ? dict_args[1] : "";

    switch (key) {
        case 'defn':
            if (!word) {
                console.log('Please enter the word to get definitions');
                process.exit();
            }
            dictionary.defnOrexmple('definitions', word, true, true);
            break;
        case 'ex':
            if (!word) {
                console.log('Please enter the word to get examples');
                process.exit();
            }
            dictionary.defnOrexmple('examples', word, true, true);
            break;
        case 'syn':
            if (!word) {
                console.log('Please enter the word to get synonyms');
                process.exit();
            }
            dictionary.synOrant('synonym', word, true, true);
            break;
        case 'ant':
            if (!word) {
                console.log('Please enter the word to get antonyms');
                process.exit();
            }
            dictionary.synOrant('antonym', word, true, true);
            break;
        case 'play':
            dictionary.playGame();
            break;
        default:
            // key is the word because we are not preceeded with any of the type
            word = key;
            dictionary.fullDict(word);
            break;
    }
} else {
    //call random full dict
    dictionary.fullDict();

}


// dictionary play tool

