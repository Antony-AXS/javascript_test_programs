function sort_operator(param, sort_by, order) {

    let command_array = [
        { code: 'ASC', function: 'Ascending' },
        { code: 'DESC', function: 'Descending' },
        { code: 'NOR', function: 'Same order' },
        { code: 'MIN', function: 'Ascending' },
        { code: 'MAX', function: 'Descending' },
        { code: 'BESV', function: 'Ascending' },
        { code: 'AWQ', function: 'Descending' },
        { code: 'REXT', function: 'Same order' },
        { code: 'VBN', function: 'Ascending' },
        { code: 'IOU', function: 'Descending' },
    ]

    sort_by = sort_by.toString();

    if (param && typeof (sort_by) === "string" && typeof (order) === 'undefined' || 'string') {

        let collector;
        let ordered_obj;
        let creationDate;
        let final_array = [];
        let initial_array = [];
        let sort_array = param;

        for (let i = 0; i < param.length; i++) {

            sort_array.forEach((item, index) => {

                creationDate = parseInt(item[sort_by]);

                if (index === 0) {

                    collector = creationDate;

                    ordered_obj = item;
                }
                if (index > 0) {

                    if (!order || (order === "DESC" || order === "MAX")) {

                        if (creationDate > collector) {

                            collector = creationDate;

                            ordered_obj = item;
                        }
                    } else if (order === "ASC" || "MIN") {

                        if (creationDate < collector) {

                            collector = creationDate;

                            ordered_obj = item;
                        }
                    }
                    var cmd_bool = false;

                    command_array.forEach((item) => { if (item.code === order) { console.log(item.code + ` ${i}, ${index}`); return cmd_bool = true; } });

                    let error_message = `please enter a vaild command  here are some examples...${JSON.stringify(command_array)}`;

                    if (cmd_bool === false) {

                        throw new Error(error_message);
                    }
                }
            });

            if (param.length > 1) {

                let filtered_json_string;

                filtered_json_string = JSON.stringify(sort_array).replace(JSON.stringify(ordered_obj), "");

                var s = filtered_json_string.toString();

                var index = s.length - 2;

                if (s[index] === ",") {

                    s = s.substring(0, index) + '' + s.substring(index + 1);
                }
                var t;

                if (filtered_json_string[1] === ",") {

                    t = filtered_json_string.toString();

                    var index = 1;

                    t = t.substring(0, index) + '' + t.substring(index + 1);

                    s = t;
                }
                let fixed_filterd_json = s.replace(/(?<=})(,\s*,)(?={\s*(")\w+\2\s*:)/gm, ",");

                sort_array = JSON.parse(fixed_filterd_json);
            }
            initial_array.push(collector);

            final_array.push(ordered_obj);
        }
        return {
            initial_array: initial_array,

            final_array: final_array
        };
    } else {

        return ("please pass the right type of parameters");
    }

}

module.exports = sort_operator;