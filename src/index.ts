type CollapseElement = {
    collapse: HTMLElement,
    content: HTMLElement,
    trigger: HTMLElement,
    onComplete?: () => void
};

export function initCollapse(triggerElement: HTMLElement) {
    const collapse = document.querySelector<HTMLDivElement>(triggerElement.dataset.collapseTarget as string);

    if (!collapse) {
        window.console.warn('Collapse target not found: ' + triggerElement.dataset.collapseTarget);
        return;
    }

    const collapseContent = collapse.querySelector<HTMLDivElement>('[data-collapse-content]');

    if (!collapseContent) {
        window.console.warn('Collapse content not found: ' + triggerElement.dataset.collapseTarget);
        return;
    }

    let isAnimating = false;

    triggerElement.addEventListener('click', () => {

        if (isAnimating) {
            return;
        }

        const shouldOpen = shouldOpenCollapse(collapse);

        if (shouldOpen) {
            isAnimating = true;

            open({
                collapse,
                content: collapseContent,
                trigger: triggerElement,
                onComplete: () => {
                    isAnimating = false;
                }
            });
        } else {
            isAnimating = true;

            close({
                collapse,
                content: collapseContent,
                trigger: triggerElement,
                onComplete: () => {
                    isAnimating = false;
                }
            });
        }
    });
}

export function initAccordion(accordion: HTMLElement) {
    const triggers = [ ...accordion.querySelectorAll<HTMLElement>('[data-collapse-target]') ];

    if (!triggers.length) {
        window.console.warn('Accordion target not found');
    }

    const map = new Map();
    let isAnimating = false;

    triggers.forEach((triggerElement, index) => {
        const collapse = document.querySelector<HTMLDivElement>(triggerElement.dataset.collapseTarget as string);

        if (!collapse) {
            window.console.warn('Collapse target not found: ' + triggerElement.dataset.collapseTarget);
            return;
        }

        const collapseContent = collapse.querySelector<HTMLDivElement>('[data-collapse-content]');

        if (!collapseContent) {
            window.console.warn('Collapse content not found: ' + triggerElement.dataset.collapseTarget);
            return;
        }

        const shouldOpen = shouldOpenCollapse(collapse);

        map.set(index, {
            triggerElement,
            collapse,
            collapseContent,
            isOpen: !shouldOpen
        });

        triggerElement.addEventListener('click', () => {
            if (isAnimating) {
                return;
            }

            //  close if already open
            if (map.get(index).isOpen) {
                isAnimating = true;

                close({
                    collapse: map.get(index).collapse,
                    content: map.get(index).collapseContent,
                    trigger: map.get(index).triggerElement,
                    onComplete: () => {
                        isAnimating = false;
                    }
                });

                map.set(index, {
                    ...map.get(index),
                    isOpen: false
                });
            } else {
                isAnimating = true;

                // close all open
                map.forEach((value, key) => {
                    if (value.isOpen) {

                        close({
                            collapse: map.get(key).collapse,
                            content: map.get(key).collapseContent,
                            trigger: map.get(key).triggerElement,
                            onComplete: () => {
                                isAnimating = false;
                            }
                        });

                        map.set(key, {
                            ...map.get(key),
                            isOpen: false
                        });
                    }
                });

                // open current
                open({
                    collapse: map.get(index).collapse,
                    content: map.get(index).collapseContent,
                    trigger: map.get(index).triggerElement,
                    onComplete: () => {
                        isAnimating = false;
                    }
                });

                map.set(index, {
                    ...map.get(index),
                    isOpen: true
                });
            }
        });
    });
}

function open({ collapse, content, trigger, onComplete: onComplete }: CollapseElement) {
    collapse.classList.remove('m-collapse');
    collapse.classList.add('m-collapsing');

    // measure and set height of collapse content
    collapse.style.height = content.offsetHeight + 'px';
    trigger.setAttribute('aria-expanded', 'true');

    collapse.addEventListener('transitionend', () => {
        collapse.removeAttribute('style');
        collapse.classList.remove('m-collapsing');
        collapse.classList.add('m-collapse', 'show');

        if (onComplete) {
            onComplete();
        }
    }, { once: true });
}

function close({ collapse, content, trigger, onComplete: onComplete }: CollapseElement) {
    // measure and set height of collapse content
    collapse.style.height = content.offsetHeight + 'px';
    collapse.classList.add('m-collapsing');
    collapse.classList.remove('m-collapse', 'show');
    trigger.setAttribute('aria-expanded', 'false');

    setTimeout(() => {
        collapse.removeAttribute('style');
    });

    collapse.addEventListener('transitionend', () => {
        collapse.classList.remove('m-collapsing');
        collapse.classList.add('m-collapse');

        if (onComplete) {
            onComplete();
        }
    }, { once: true });
}

function shouldOpenCollapse(collapse: HTMLElement) {
    return collapse.classList.contains('m-collapse') && !collapse.classList.contains('show');
}
