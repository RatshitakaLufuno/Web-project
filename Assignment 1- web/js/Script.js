/* =====================================================
   EMPOWERING THE NATION
   MAIN JAVASCRIPT
   ===================================================== */


/* =====================================================
   COURSE DATA
   ===================================================== */

const courses = [
    {
        name: "First Aid",
        price: 1500
    },
    {
        name: "Sewing",
        price: 1500
    },
    {
        name: "Landscaping",
        price: 1500
    },
    {
        name: "Life Skills",
        price: 1500
    },
    {
        name: "Child Minding",
        price: 750
    },
    {
        name: "Cooking",
        price: 750
    },
    {
        name: "Garden Maintenance",
        price: 750
    }
];


/* =====================================================
   FEE CALCULATOR
   ===================================================== */

const feeForm = document.getElementById("feeForm");


if (feeForm) {

    feeForm.addEventListener("submit", function (event) {

        event.preventDefault();


        /* ---------------------------------------------
           GET CUSTOMER INFORMATION
           --------------------------------------------- */

        const customerName =
            document.getElementById("customerName").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const enquiryType =
            document.getElementById("enquiryType").value;


        /* ---------------------------------------------
           ERROR HANDLING
           --------------------------------------------- */

        if (customerName.length < 2) {

            alert("Please enter a valid full name.");

            return;
        }


        if (!/^[0-9]{10}$/.test(phone)) {

            alert(
                "Please enter a valid 10-digit phone number."
            );

            return;
        }


        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailPattern.test(email)) {

            alert(
                "Please enter a valid email address."
            );

            return;
        }


        if (enquiryType === "") {

            alert(
                "Please select an enquiry type."
            );

            return;
        }


        /* ---------------------------------------------
           GET SELECTED COURSES
           --------------------------------------------- */

        const selected =
            document.querySelectorAll(
                ".course-checkbox:checked"
            );


        if (selected.length === 0) {

            alert(
                "Please select at least one course."
            );

            return;
        }


        /* ---------------------------------------------
           STORE SELECTED COURSES IN ARRAY
           --------------------------------------------- */

        let selectedCourses = [];

        let subtotal = 0;


        selected.forEach(function (checkbox) {

            const courseName =
                checkbox.dataset.name;

            const price =
                Number(checkbox.value);


            selectedCourses.push({
                name: courseName,
                price: price
            });


            subtotal += price;

        });


        /* ---------------------------------------------
           DISCOUNT
           --------------------------------------------- */

        let discountPercentage = 0;


        if (selectedCourses.length === 1) {

            discountPercentage = 0;

        }

        else if (selectedCourses.length === 2) {

            discountPercentage = 5;

        }

        else if (selectedCourses.length === 3) {

            discountPercentage = 10;

        }

        else {

            discountPercentage = 15;

        }


        const discountAmount =
            subtotal * (discountPercentage / 100);


        const amountAfterDiscount =
            subtotal - discountAmount;


        /* ---------------------------------------------
           VAT
           --------------------------------------------- */

        const vatPercentage = 15;


        const vat =
            amountAfterDiscount *
            (vatPercentage / 100);


        /* ---------------------------------------------
           TOTAL
           --------------------------------------------- */

        const total =
            amountAfterDiscount + vat;


        /* ---------------------------------------------
           CURRENCY FORMAT
           --------------------------------------------- */

        function money(amount) {

            return "R" +
                amount.toLocaleString(
                    "en-ZA",
                    {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    }
                );

        }


        /* ---------------------------------------------
           CREATE COURSE LIST
           --------------------------------------------- */

        let courseList = "";


        selectedCourses.forEach(function (course) {

            courseList += `
                <li>
                    ${course.name}
                    -
                    <strong>
                        ${money(course.price)}
                    </strong>
                </li>
            `;

        });


        /* ---------------------------------------------
           DISPLAY RESULT
           --------------------------------------------- */

        const quoteResult =
            document.getElementById("quoteResult");


        quoteResult.innerHTML = `

            <h3 style="color:#1b4332;">
                Empowering the Nation
            </h3>

            <p>
                <strong>Customer:</strong>
                ${customerName}
            </p>

            <p>
                <strong>Phone:</strong>
                ${phone}
            </p>

            <p>
                <strong>Email:</strong>
                ${email}
            </p>

            <hr style="margin:15px 0;">


            <h4 style="color:#1b4332;">
                Selected Courses
            </h4>

            <ul style="padding-left:20px;">

                ${courseList}

            </ul>


            <div class="quote-row">

                <span>
                    Number of Courses
                </span>

                <strong>
                    ${selectedCourses.length}
                </strong>

            </div>


            <div class="quote-row">

                <span>
                    Subtotal
                </span>

                <strong>
                    ${money(subtotal)}
                </strong>

            </div>


            <div class="quote-row">

                <span>
                    Discount
                </span>

                <strong>
                    ${discountPercentage}%
                </strong>

            </div>


            <div class="quote-row">

                <span>
                    Discount Amount
                </span>

                <strong>
                    ${money(discountAmount)}
                </strong>

            </div>


            <div class="quote-row">

                <span>
                    Amount After Discount
                </span>

                <strong>
                    ${money(amountAfterDiscount)}
                </strong>

            </div>


            <div class="quote-row">

                <span>
                    VAT (15%)
                </span>

                <strong>
                    ${money(vat)}
                </strong>

            </div>


            <div class="quote-total">

                Total Quoted Fee:
                ${money(total)}

            </div>

        `;


        /* ---------------------------------------------
           SAVE DATA
           --------------------------------------------- */

        localStorage.setItem(
            "selectedCourses",
            JSON.stringify(selectedCourses)
        );


        localStorage.setItem(
            "customerName",
            customerName
        );


        localStorage.setItem(
            "customerPhone",
            phone
        );


        localStorage.setItem(
            "customerEmail",
            email
        );


        localStorage.setItem(
            "totalFee",
            total.toFixed(2)
        );

    });

}