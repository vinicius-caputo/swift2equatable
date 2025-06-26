import { swift2equatable } from './index';
import { argv } from 'process';

function resolveArgs() {
    if (argv.length < 3) {
        console.log('Basic usage: swift2equatable <path-to-swift-file>');
        console.log('Help: swift2equatable -h');
        process.exit(1);
    }
    let path = argv[2];
    let string = '';
    let outputPath = '';
    let useRetroactive = false;
    let usePublic = false;
    argv.forEach((val, index) => {
        if (val == '-h' || val == '--help') {
            console.log('Basic usage: swift2equatable <path-to-swift-file>');
            console.log('Options:');
            console.log(' -p, --path <path-to-swift-file>  Path to swift file');
            console.log(' -o, --outputPath <path-to-output-file>  Path to output file');
            console.log(' -s, --string <swift-string> swift string');
            console.log(' -h, --help  Display this help message');
            console.log(' -r, --useRetroactive  Use retroactive protocol conformance');
            console.log(' -p, --usePublic  Use public prefix in generated code');
            process.exit(0);
        }
        else if (val == '-p' || val == '--path') {
            path = argv[index + 1];
        }
        else if (val == "-s" || val == "--string") {
            string = argv[index + 1];
        }
        else if (val == '-o' || val == '--outputPath') {
            outputPath = argv[index + 1];
        }
        else if (val == '-r' || val == '--useRetroactive') {
            useRetroactive = true;
        }
        else if (val == '-p' || val == '--usePublic') {
            usePublic = true;
        }
    });

    let convertedCode = '';
    if (string != '') {
        convertedCode = swift2equatable(string, usePublic, useRetroactive);
    }
    else if (path != '') {
        const fs = require('fs');
        let swiftFile = fs.readFileSync(path, 'utf8')
        convertedCode = swift2equatable(swiftFile, usePublic, useRetroactive);
    }
    
    if (outputPath != '') {
        const fs = require('fs');
        fs.writeFileSync(outputPath.replace(".swift",'')+".swift", convertedCode);
    }
    
    console.log(convertedCode);
}

resolveArgs();