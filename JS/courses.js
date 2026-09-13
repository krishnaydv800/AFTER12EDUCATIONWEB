// ============================================
// AFTER12 - COURSE SEARCH SYSTEM
// ============================================

const courses = [
    {
        name: "B.Tech",
        stream: "Science",
        description: "Bachelor of Technology - Engineering, Computer Science, AI, Software and Technology.",
        page: "btech.html"
    },

    {
        name: "BCA",
        stream: "Science",
        description: "Bachelor of Computer Applications - Programming, Software Development and Computer Applications.",
        page: "bca.html"
    },

    {
        name: "B.Sc",
        stream: "Science",
        description: "Bachelor of Science - Physics, Chemistry, Mathematics, Biology and Computer Science.",
        page: "bsc.html"
    },

    {
        name: "MBBS",
        stream: "Science",
        description: "Bachelor of Medicine and Bachelor of Surgery - Medical and Healthcare.",
        page: "mbbs.html"
    },

    {
        name: "B.Com",
        stream: "Commerce",
        description: "Bachelor of Commerce - Accounting, Finance, Taxation and Business.",
        page: "bcom.html"
    },

    {
        name: "BBA",
        stream: "Commerce",
        description: "Bachelor of Business Administration - Management, Marketing, Finance and HR.",
        page: "bba.html"
    },

    {
        name: "BA",
        stream: "Arts",
        description: "Bachelor of Arts - History, English, Psychology, Political Science and Humanities.",
        page: "ba.html"
    },

    {
        name: "LLB",
        stream: "Arts",
        description: "Bachelor of Laws - Law, Legal Services and Judiciary.",
        page: "llb.html"
    }
];


// ============================================
// HTML ELEMENTS
// ============================================

const searchInput = document.getElementById("courseSearch");
const streamFilter = document.getElementById("streamFilter");
const courseGrid = document.getElementById("courseGrid");


// ============================================
// CHECK HTML ELEMENTS
// ============================================

if (!searchInput) {
    console.error("ERROR: #courseSearch not found!");
}

if (!streamFilter) {
    console.error("ERROR: #streamFilter not found!");
}

if (!courseGrid) {
    console.error("ERROR: #courseGrid not found!");
}


// ============================================
// NORMALIZE SEARCH TEXT
// ============================================

function normalizeText(text) {

    return text
        .toLowerCase()
        .trim()
        .replace(/\./g, "")
        .replace(/\s+/g, "");

}


// ============================================
// SHOW COURSES
// ============================================

function showCourses(courseList) {

    if (!courseGrid) return;

    courseGrid.innerHTML = "";


    // No result
    if (courseList.length === 0) {

        courseGrid.innerHTML = `
            <div class="no-course">
                <h3>😕 Course Not Found</h3>

                <p>
                    Please try B.Tech, BCA, BBA, B.Com,
                    B.Sc, MBBS, BA or LLB.
                </p>
            </div>
        `;

        return;
    }


    // Create cards
    courseList.forEach(function(course) {

        const card = document.createElement("div");

        card.className = "course-card";


        card.innerHTML = `
            
            <div class="course-content">

                <span class="course-stream">
                    ${course.stream}
                </span>

                <h3>
                    ${course.name}
                </h3>

                <p>
                    ${course.description}
                </p>

                <a
                    href="${course.page}"
                    class="btn"
                >
                    View Details →
                </a>

            </div>

        `;


        courseGrid.appendChild(card);

    });

}


// ============================================
// SEARCH COURSES
// ============================================

function searchCourses() {

    if (!searchInput || !streamFilter) return;


    const searchValue =
        searchInput.value.toLowerCase().trim();


    const selectedStream =
        streamFilter.value.toLowerCase();


    const filteredCourses = courses.filter(function(course) {


        // Complete searchable text
        const courseText = (

            course.name +
            " " +
            course.stream +
            " " +
            course.description

        ).toLowerCase();


        // Search match
        const searchMatch =
            courseText.includes(searchValue);


        // Stream match
        const streamMatch =
            selectedStream === "all" ||
            course.stream.toLowerCase() === selectedStream;


        return searchMatch && streamMatch;

    });


    showCourses(filteredCourses);

}


// ============================================
// SEARCH WHILE TYPING
// ============================================

if (searchInput) {

    searchInput.addEventListener(
        "input",
        searchCourses
    );

}


// ============================================
// ENTER KEY
// ============================================

if (searchInput) {

    searchInput.addEventListener(
        "keydown",
        function(event) {

            if (event.key !== "Enter") {
                return;
            }


            event.preventDefault();


            const searchValue =
                normalizeText(searchInput.value);


            // Empty search
            if (searchValue === "") {

                showCourses(courses);

                return;
            }


            // Find exact course
            const course =
                courses.find(function(item) {

                    return (
                        normalizeText(item.name) ===
                        searchValue
                    );

                });


            // Course found
            if (course) {

                window.location.href =
                    course.page;

                return;
            }


            // Alternative names
            const aliases = {

                "engineering": "btech.html",
                "btech": "btech.html",
                "bacheloroftechnology": "btech.html",

                "computerapplications": "bca.html",
                "bca": "bca.html",

                "science": "bsc.html",
                "bsc": "bsc.html",

                "medical": "mbbs.html",
                "mbbs": "mbbs.html",

                "commerce": "bcom.html",
                "bcom": "bcom.html",

                "management": "bba.html",
                "bba": "bba.html",

                "arts": "ba.html",
                "ba": "ba.html",

                "law": "llb.html",
                "llb": "llb.html"

            };


            if (aliases[searchValue]) {

                window.location.href =
                    aliases[searchValue];

                return;
            }


            // Course not found
            showCourses([]);


        }
    );

}


// ============================================
// STREAM FILTER
// ============================================

if (streamFilter) {

    streamFilter.addEventListener(
        "change",
        searchCourses
    );

}


// ============================================
// LOAD ALL COURSES
// ============================================

showCourses(courses);


// ============================================
// SUCCESS MESSAGE
// ============================================

console.log(
    "✅ After12 Courses JS Loaded Successfully!"
);