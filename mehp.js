
function mehp () {

    function toggleStyleDisplay (element) {
        if (element.classList.contains("toggledVisible")) element.classList.remove("toggledVisible");
        else element.classList.add("toggledVisible");
    }

    function toggleTextPresentationMode () {
        if (document.getElementsByTagName('body')[0].className == "presentation")
            document.getElementsByTagName('body')[0].className = "text";
        else
            document.getElementsByTagName('body')[0].className = "presentation";
    }

    function navigateHash(next) {
        var no = window.location.hash;
		    no = parseInt(no.substr(1));

        switch (next) {
        case false:
            if (no > 0) {
                console.log("Opening slide " + no);
                if (typeof fullscreenWindow != "undefined") fullscreenWindow.location.hash = "#" + (no - 1);
                window.location.hash = "#" + (no - 1);
            } else {
                console.log("This is the first slide. No navigating back.");
            }
            break;

        case true:
            if (no == allSections.length - 1) {
                console.log("Reached last slide. No navigating further from here.");
            }
            else {
                console.log("Opening slide " + no);
                if (typeof fullscreenWindow != "undefined") fullscreenWindow.location.hash = "#" + (no + 1);
                window.location.hash = "#" + (no + 1);
            }
            break;
        }
    }

    function createToC (element) {

        var headlines = ["H2", "H3", "H4"];

        // Set ids to all sections
        for (var i = 0, max = allSections.length; i < max; i++) {
            var children = allSections[i].children;
            for (var j = 0, maxj = children.length; j < maxj; j++) {
                if (headlines.indexOf(children[j].tagName) != -1) {

                    console.log(j);
                    var toAdd       = document.createElement("a");
                    toAdd.href      = "#" + allSections[i].id;
                    toAdd.classList = children[j].tagName;
                    toAdd.innerHTML = children[j].innerHTML;
                    element.appendChild(toAdd);

                }
            }
        }


    }

    function initializeIDsStyles() {

        // Bind body to variable. Used all the time here anyway.
        var body = document.getElementsByTagName("body")[0];

        // Add help to body
        var helpDiv = document.createElement("div");
        helpDiv.id = "help";
        helpDiv.innerHTML = helpText;
        body.appendChild(helpDiv);

        // Add fields for going to previous / next slide to body
        var prevNext = [["prev", function (e) {
            navigateHash(false);
        }], ["next", function (e) {
            navigateHash(true);
        }]];
        for (var i = 0, max = 2; i < max; i++) {

            var element = document.createElement("div");
            element.id = prevNext[i][0];
            element.addEventListener('click', prevNext[i][1]);
            body.appendChild(element);

        }

        // Add fields for options to page
        var optionsDiv = document.createElement("div");
        optionsDiv.id = "options";
        body.appendChild(optionsDiv);

        // Bind help to options
        var optionsOpenerTextPresentation = document.createElement("div");
        optionsOpenerTextPresentation.id = "optionsOpenerTextPresentation";
        optionsDiv.appendChild(optionsOpenerTextPresentation);

        optionsOpenerTextPresentation.addEventListener('click', function (e) {
            toggleTextPresentationMode();
            });

        // Check if the presentation is embedded somewhere.
        // If so, add option to leave the window.

        // Bind help to options
        if (self != top) {
            var optionsOpenerOwnTab = document.createElement("div");
            optionsOpenerOwnTab.id = "optionsOpenerOwnTab";
            optionsDiv.appendChild(optionsOpenerOwnTab);

            optionsOpenerOwnTab.addEventListener('click', function (e) {
                top.location.href = window.location.href;
            });
        }

        // Bind ToC to options
        var optionsOpenerToC = document.createElement("div");
        optionsOpenerToC.id = "optionsOpenerToC";
        optionsDiv.appendChild(optionsOpenerToC);

        optionsOpenerToC.addEventListener('click', function (e) {
            toggleStyleDisplay(document.getElementById('toc'));
        });

        // Bind help to options
        var optionsOpenerHelp = document.createElement("div");
        optionsOpenerHelp.id = "optionsOpenerHelp";
        optionsDiv.appendChild(optionsOpenerHelp);

        optionsOpenerHelp.addEventListener('click', function (e) {
            toggleStyleDisplay(document.getElementById('help'));
        });

        // Set ids to all sections
        for (var i = 0, max = allSections.length; i < max; i++) {
            allSections[i].id = i.toString();
        }

        // Add table of contents to body
        var toc = document.createElement("div");
        toc.id = "toc";
        body.appendChild(toc);

        createToC (toc); // Run function to create the ToC

        // Get all elements containing an aside element
        // and set class to them to mark them.
        var allAsides   = document.getElementsByTagName("aside");
        for (var i = 0, max = allAsides.length; i < max; i++) {
            var parent = allAsides[i].parentElement;
            parent.classList.add("containsAside");
            asideParents.push(parent);
        }

    }

    /* ------------
   Bind keys for moving back and forward
   ------------ */

    function initializeKeybindings () {

        if (document.getElementsByTagName('body')[0] != null) {
            document.getElementsByTagName('body')[0].addEventListener('keydown', function (e) {

                // Get number of the current page from anchor
                var no = window.location.hash;
		            no = parseInt(no.substr(1));

                switch (e.keyCode) {
                case  37:
                case  38:
                    navigateHash(false);
                    break;

                case 39:
                case 40:
                    navigateHash(true);
                    break;
                }
            });

            // Bind switcher between text and presentation and opener for options
            document.getElementsByTagName('body')[0].addEventListener('keydown', function (e) {

                if (!e.ctrlKey) {
                    return;
                }
                switch (e.keyCode) {
                case  75:
                    e.preventDefault();
                    toggleStyleDisplay(document.getElementById('toc'));
                    break;
                case  77:
                    e.preventDefault();
                    toggleTextPresentationMode();
                    break;
                case  79:
                    e.preventDefault();
                    toggleStyleDisplay(document.getElementById('options'));
                    break;
                }

            });

            // Bind opening help
            document.getElementsByTagName('body')[0].addEventListener('keydown', function (e) {

                switch (e.keyCode) {
                case 112:
                    e.preventDefault();
                    toggleStyleDisplay(document.getElementById('help'));
                    break;
                case 122:
                    e.preventDefault();
                    document.getElementsByTagName('body')[0].classList.add("speakerView");
                    fullscreenWindow = window.open(window.location,'windowName','resizable=1,scrollbars=0,fullscreen=1,toolbar=1, menubar=1,status=1');

                    fullscreenWindow.addEventListener('keydown', function (e) {
                        if (e.keyCode == 27) {
                            document.getElementsByTagName('body')[0].classList.remove("speakerView");
                            fullscreenWindow.close();
                            console.log("Closing speaker view.");
                        }
                    });

                    console.log("Opened speaker view.");

                    break;
                }

            });

            for (var i = 0, max = asideParents.length; i < max; i++) {
                asideParents[i].addEventListener('click', function (e) {
                    var children = e.srcElement.children;
                    for (var j = 0, max = children.length; j < max; j++) {
                        if (children[j].tagName == "ASIDE") {
                            toggleStyleDisplay(children[j]);
                            break;
                        }
                    }
                    e.stopPropagation();
                });
            }

        }
    }

    /* ------------
       Enforce setting hash
       Open first slide if none is set.
       ------------ */

    function setHash() {
        if(!window.location.hash) {
            history.pushState(null, null, '#0');
        }
    }

    /* ------------
       Run functions and set generally accessible vars
       ------------ */

    var allSections  = document.getElementsByTagName("section");
    var asideParents = [];
    var fullscreenWindow;

    var helpText = `
    <h2>Help</h2>
    <h3>Keybindings</h3>
    <dl>
        <dt><kbd>Left</kbd> / <kbd>Right</kbd></dt><dd>Go to previous / next slide</dd>
        <dt><kbd>CTRL+M</kbd></dt><dd>Switch between text and presentation modes</dd>
        <dt><kbd>CTRL+K</kbd></dt><dd>Toggle table of contents</dd>
        <dt><kbd>CTRL+O</kbd></dt><dd>Toggle Options</dd>
        <dt><kbd>F1</kbd></dt><dd>Show this help page</dd>
        <dt><kbd>F11</kbd></dt><dd>Open speaker view</dd>
        <dt><kbd>Escape</kbd></dt><dd>Close speaker view</dd>
        <dt><kbd>Click on section</kbd></dt><dd>Open notes or text of this section.</dd>
    </dl>
    `;

    initializeIDsStyles();
    setHash();
    initializeKeybindings();

}
