const fs = require("fs")
const { createInterface } = require('readline')
const zipFiles = require('./filezipper')

const r1 = createInterface({
  input: process.stdin,
  output: process.stdout
});

const main = () => {
    r1.question(`\nEnter Directory Path (ex D:\\bla\\bla...): `, (dirpath) => {
        fs.access(dirpath, function(error) {
            if (error) {
              console.log("Directory does not exist.")
              main()
            } else {
                fs.stat(dirpath, (error, stats) => {
                    if(error) {
                        console.log(error)
                        main()
                    } else {
                        if(stats.isDirectory) {
                            // Start zipping
                            zipFiles(dirpath, (result) => {
                                if(result.success) {
                                   console.log(result.message) 
                                } else {
                                    console.log(result.error)
                                }
                                r1.close()
                            })
                            
                        }else {
                            console.log("Invalid path. \n")
                            main()                      
                        }
                    }
                })
            }
          })
    })	
}

main()