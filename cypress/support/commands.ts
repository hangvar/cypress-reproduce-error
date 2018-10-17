import * as axe from 'axe-core';

Cypress.Commands.add('navigateTo', (url: string) => {
    cy.window().then(w => {
        if (w.location.hash !== '') {
            w.location.hash = url;
        } else {
            cy.visit(url);
        }
    });
});

Cypress.Commands.add('axe', () => {
    return cy.window({ log: false }).then(w => {
        expect(w).to.have.property('axe');

        configureAxe(w);

        return (w as any).axe.run({ elementRef: true });
    }).then((results: axe.AxeResults) => {
        results.violations.forEach(v => {
            v.nodes.forEach(n => {
                expect((n as any).element, v.help).to.equal(n.failureSummary);
            });
        });

        results.incomplete.forEach(v => {
            v.nodes.forEach(n => {
                cy.log('AxE incomplete', [n.target[0], v.help]);
            });
        });
    });
});

if (Cypress.env('axe')) {
    Cypress.Commands.overwrite('click', (click, subject, options) => {
        if (options && options.force !== undefined) {
            return click(subject, options);
        }

        return cy.axe().then(r => {
            return click(subject, options);
        });
    });
}

function configureAxe(w: Window) {
    (w as any).axe.configure({
        rules: [
            { id: 'heading-order', enabled: false },
            { id: 'page-has-heading-one', enabled: false },
            { id: 'region', enabled: false }
        ]
    });
}

