
function triangle_pyramid(display_unit, increment_value) {

    if (typeof display_unit !== "string") {

        return console.log("please pass the right type of paramters");

    } else if (typeof display_unit === "string" && display_unit.length !== 1) {

        return console.log("you can only enter a single character");

    } else if (!increment_value) {

        return console.log("please enter the increment value, it should be a natural number");
    }

    let char_1 = display_unit;

    let char_2 = " ";

    let j = increment_value;

    let big_spacer = null;

    let init_values = {

        r: "",

        s: "",

        t: "",

        u: "",
    };

    if (j) {

        let m = 0;

        while (m < j) {

            init_values.s = init_values.s + char_2;

            init_values.t = init_values.t + char_2;

            m++;
        }

        big_spacer = init_values.t + init_values.t.replace(char_2, "");

        let b = 0;

        while (b < j) {

            init_values.u = init_values.u + big_spacer;

            b++;
        }
    }

    let small_triangle = "";

    let set_space = init_values.u;

    for (let macro = 0; macro < j; macro++) {

        let blank_space = init_values.s;

        for (let q = 0; q < j; q++) {

            let u = init_values.r;

            init_values.r = init_values.r + char_1;

            blank_space = blank_space.replace(char_2, "");

            small_triangle = blank_space + init_values.r + u + blank_space;

            let list_triangle = "";

            for (let e = 0; e < 2 * macro + 1; e++) {

                list_triangle = list_triangle + small_triangle;
            }

            if (q === 0) {

                set_space = set_space.replace(big_spacer, "");
            }

            let triangle = set_space + list_triangle + set_space;

            console.log(triangle);
        }

        init_values.r = "";
    }
}

module.exports = { triangle_pyramid };
