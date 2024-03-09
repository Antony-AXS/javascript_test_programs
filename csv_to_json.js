const fs = require('fs');
const path = require('path');

let csv_path = path.join(process.cwd(), 'a.csv');

var final_array = [];

async function convert_data() {

    fs.readFile(csv_path, (err, csv) => {

        let rows;
        let columns;

        if (err) {
            throw new Error(err)
        }

        csv = csv.toString('utf-8').replace(/"{2,4}/g, '"');

        rows = csv.split(/\n/gm);

        let headers = rows.shift().replace(/(?<=\w+)\s+(?=\w+)/g, "_").split(",");

        columns = headers.map((ele) => /[^"\s]+/g.exec(ele)[0]);

        for (let i = 0; i < rows.length; i++) {

            let doc_obj_fin = {};

            let item = rows[i].match(/(?<=")\w+(?=")|(?<=")\[.+?\](?=")/g);

            if (item.length === columns.length) {

                for (let m = 0; m < item.length; m++) {

                    doc_obj_fin[`${columns[m]}`] = eval(item[m]);

                    if (m === (item.length - 1)) {

                        final_array.push(doc_obj_fin);
                    }
                }
            }
        }
        fs.writeFileSync("welcome.json", JSON.stringify(final_array));
    })
}

convert_data()
