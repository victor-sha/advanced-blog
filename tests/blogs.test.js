const Page = require('./helpers/page');

let page;

beforeEach(async () => {
    page = await Page.build();
    await page.goto('localhost:3000');
});

afterEach(async () => {
    await page.close();
});

describe('When logged in', async () => {

    beforeEach(async () => {
        await page.login();
        await page.click('a.btn-floating');
    });
    
    test('Can see blog create form', async () => {
        await page.login();
        await page.click('a.btn-floating');
        const form = await page.getContentsOf('form label');
    
        expect(form).toEqual('Blog Title');
    });

    describe('And using valid form inputs', async () => {
        beforeEach(async () => {
            await page.type('input[name="title"]', 'Test blog title');
            await page.type('input[name="content"]', 'blog content');
            await page.click('form button[type="submit"]');
        });

        test('submitting takes user to a review screen', async () => {
            const confirmMessage = await page.getContentsOf('form > h5');
            expect(confirmMessage).toEqual('Please confirm your entries');
        });

        test('submitting save adds blog to Blog Index page', async () => {
            await page.click('form button.green');
            await page.waitFor('.card');

            const title = await page.getContentsOf('.card-title');
            const content = await page.getContentsOf('p');

            expect(title).toEqual('Test blog title');
            expect(content).toEqual('blog content');
        });
    });

    describe('And using invalid input', async () => {
        beforeEach(async () => {
            await page.click('button[type="submit"]');
        });

        test('the form shows an error message', async () => {
            const titleError = await page.getContentsOf('.title .red-text');
            const contentError = await page.getContentsOf('.content .red-text');

            expect(titleError).toEqual('You must provide a value');
            expect(contentError).toEqual('You must provide a value');
        });
    });    
});