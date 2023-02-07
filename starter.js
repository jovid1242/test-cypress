const cypress = require("cypress");
const fs = require("fs");
const asyncNode = require("async");
const path = require("path");
const uuid = require("uuid");
const unzipper = require("unzipper");
const deleteFolder = require("./utils/deleteFolder");

class starter {
  async run() {
    const queue = asyncNode.queue((element, completed) => {
      console.log("Currently Busy Processing Task " + element.id);

      fs.mkdir(path.join(__dirname, "/uploads/testFiles"), (err) => {
        if (err) {
          console.log({ message: "Что-то пошло не так - testFiles" + err });
        }
      });

      unzipper.Open.file(
        path.join(__dirname, `/uploads/files/${element.name}`)
      ).then((d) => {
        d.extract({ path: path.join(__dirname + "/uploads/testFiles") });
      });

      cypress
        .run({
          spec: "./cypress/e2e/test_File.cy.js",
        })
        .then((results) => {
          try {
            fs.unlinkSync(
              path.join(__dirname + `/uploads/files/${element.name}`)
            );
            console.log({
              totalPassed: results.totalFailed,
              totalFailed: results.totalFailed,
            });

            deleteFolder(path.join(__dirname + "/uploads/testFiles"));
            fs.writeFileSync(
              path.join(__dirname + "/db/tests.json"),
              JSON.stringify([
                ...dbTest,
                {
                  id: uuid.v4(),
                  complete: results.totalFailed === 0 ? true : false,
                  startedTestsAt: results.startedTestsAt,
                  endedTestsAt: results.endedTestsAt,
                  totalFailed: results.totalFailed,
                  totalTests: results.totalTests,
                  totalPassed: results.totalPassed,
                  tests: results.runs[0].tests,
                  status: results.totalFailed > 0 ?  "Проверки завершились с ошибкой." : "OK",
                  user_id: 1,
                  course_id: 1,
                },
              ])
            );
            const filteredData = dbData.map((item) => {
              if (item.id === element.id) {
                item.status = true;
              }
              return item;
            });
            fs.writeFileSync(
              path.join(__dirname + "/db/data.json"),
              JSON.stringify(filteredData)
            );
          } catch (error) {
            fs.unlink(
              path.join(__dirname + `/uploads/files/${element.name}`)
            );
            console.log(error);
          }
        });

      // Simulating a Complex task
      setTimeout(() => {
        // The number of tasks to be processed 
        const remaining = queue.length();
        completed(null, { element, remaining });
      }, 20000);
    }, 1);

    const dbData = JSON.parse(
      fs.readFileSync(
        path.join(__dirname + "/db/data.json"),
        (err, data) => data
      )
    );
    const dbTest = JSON.parse(
      fs.readFileSync(
        path.join(__dirname + "/db/tests.json"),
        (err, data) => data
      )
    );

    dbData.forEach((element) => {
      if (!element.status) {
        queue.push(element, (error, { task, remaining }) => {
          if (error) {
            console.log(`An error occurred while processing task`);
          } else {
            console.log(
              `Finished processing task ${remaining} tasks remaining`
            );
          }
        });
      }
    });
  }
}

module.exports = new starter();
