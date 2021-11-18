/**
 * Simple script, that renames all `ama-template` in files of this project.
 */

var readline = require('readline');
var fs = require('fs')
var rl = readline.createInterface(process.stdin, process.stdout);

function walkSync(currentDirPath, callback) {
    var path = require('path');

    fs.readdirSync(currentDirPath).forEach(function (name) {
        if (name == '.git' || name == 'node_modules' || name == 'rename-project.js') {
            console.log('Skipping ' + name + '...')
        } else {
            var filePath = path.join(currentDirPath, name);
            var stat = fs.statSync(filePath);
            if (stat.isFile()) {
                callback(filePath, stat);
            } else if (stat.isDirectory()) {
                walkSync(filePath, callback);
            }
        }
    });
}

let projectName = ''

rl.question('Select new correct name for this project: ', (newName) => {
    console.log('You selected ' + newName + ' as a new name for this project.')

    projectName = newName

    let newParentDirname = __dirname.toString().split('/')
    newParentDirname[newParentDirname.length - 1] = projectName
    newParentDirname = newParentDirname.join('/')
    fs.renameSync(__dirname, newParentDirname)

    let i = 1

    walkSync(newParentDirname, (filePath, stat) => {
        console.log(i, filePath + ' replacing all `ama-template` to `' + projectName + '`...')
        i++

        let text = fs.readFileSync(filePath, 'utf-8')
        text = text.replace(new RegExp('ama-template', 'g'), projectName)
        fs.writeFileSync(filePath, text)
    })

    rl.close()
});

