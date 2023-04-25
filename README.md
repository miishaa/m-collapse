# m-collapse
## Installation

```bash
yarn add m-collapse
# or
npm install m-collapse
```

## How to use
### Default usage

``` html
<div>
    <button
        type="button"
        data-collapse-target="#collapseExample"
        aria-expanded="false"
        aria-controls="collapseExample"
        class="js-collapse"
    >
        Collapse trigger
    </button>

    <div
        id="collapseExample"
        class="m-collapse"
        aria-labelledby="collapseExample"
    >
        <div data-collapse-content>
            <p>Lorem ipsum dolor sit amet</p>
        </div>
    </div>
</div>
```

### Initially open

``` html
<div>
    <button
        type="button"
        data-collapse-target="#collapseExample"
        aria-expanded="true"
        aria-controls="collapseExample"
        class="js-collapse"
    >
        Collapse trigger
    </button>

    <div
        id="collapseExample"
        class="m-collapse show"
        aria-labelledby="collapseExample"
    >
        <div data-collapse-content>
            <p>Collapse initially open</p>
        </div>
    </div>
</div>
```

### Accordion

``` html
<section class="js-accordion">
    <div>
        <button
            type="button"
            data-collapse-target="#accordionExample"
            aria-expanded="true"
            aria-controls="accordionExample"
            class="c-button"
        >
            Accordion panel 1
        </button>
        <div
            id="accordionExample"
            class="m-collapse show"
            aria-labelledby="accordionExample"
        >
            <div data-collapse-content>
                <p>Lorem ipsum dolor sit amet</p>
            </div>
        </div>
    </div>

    <div>
        <button
            type="button"
            data-collapse-target="#accordionExampleTwo"
            aria-expanded="false"
            aria-controls="accordionExampleTwo"
            class="c-button"
        >
            Accordion panel 2
        </button>

        <div
            id="accordionExampleTwo"
            class="m-collapse"
            aria-labelledby="accordionExampleTwo"
        >
            <div data-collapse-content>
                <p>Lorem ipsum dolor sit amet</p>
            </div>
        </div>
    </div>

    <div>
        <button
            type="button"
            data-collapse-target="#accordionExampleTree"
            aria-expanded="false"
            aria-controls="accordionExampleTree"
            class="c-button"
        >
            Accordion panel 3
        </button>

        <div
            id="accordionExampleTree"
            class="m-collapse"
            aria-labelledby="accordionExampleTree"
        >
            <div data-collapse-content>
                <p>Lorem ipsum dolor sit amet</p>
            </div>
        </div>
    </div>
</section>
```

Import via ES modules:
``` javascript
import { initAccordion, initCollapse } from 'm-collapse';
```

To initialise:
``` javascript
const collapses = [ ...document.querySelectorAll('.js-collapse') ];

if (collapses) {
    collapses.forEach(collapse => {
        initCollapse(collapse);
    });
}

const accordion = document.querySelector('.js-accordion');

if (accordion) {
    initAccordion(accordion);
}
```

## Import or write css

```css
@import "m-collapse/styles/style.css";

or

.m-collapse:not(.show) {
    display: none;
}

.m-collapsing {
    height: 0px;
    overflow: hidden;
    transition: height var(--collapsing-time, 500ms);
}
```

## License
[MIT License](https://en.wikipedia.org/wiki/MIT_License)