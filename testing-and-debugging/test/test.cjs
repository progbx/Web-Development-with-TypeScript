const chai = require("chai");
const expect = chai.expect;
const { ESLint } = require("eslint");
const {
    resolveFilePathRelativeToRoot,
    resolveFilePathRelativeToSrc,
    resolveFilePathRelativeToTest,
} = require("./utils/resolveFilePath.cjs");
const { readTextFile } = require("./utils/readTextFile.cjs");
const { checkFileExistance } = require("./utils/checkFileExistance.cjs");

const { execSync } = require("child_process");
const {
    temporaryReplaceFileContent,
} = require("./utils/temporaryReplaceFileContent.cjs");

const defaultTimeout = 5000;

describe("Testing and debugging", function () {
    let appTestFilePath;
    let appSnapshotsFilePath;
    let commonConfig;
    let eslint;

    // Test texts
    let snapshotTestText;
    let snapshotTestTextAfterMenuOpenning;

    let correctPageHeadingTestText;

    let buttonTextAfterClickingTestText;
    let buttonTextAfterClickingTwiceTestText;

    let menuAfterClickingButtonTestText;
    let menuItemsTestText;

    // Updated App files
    let appFilePath;
    let appWrongTextHeadingFilePath;

    this.beforeEach(async () => {
        // Test texts
        snapshotTestText = "should match snapshot";
        snapshotTestTextAfterMenuOpenning =
            "should match snapshot after openning a menu";
        correctPageHeadingTestText = "should have a correct page heading";
        buttonTextAfterClickingTestText =
            "should change button text after clicking";
        buttonTextAfterClickingTwiceTestText =
            "should change button text after clicking twice";
        menuAfterClickingButtonTestText =
            "should have a menu after clicking the button";
        menuItemsTestText = "should have four menu items";

        // File paths
        appFilePath = resolveFilePathRelativeToSrc("App.tsx");
        appSnapshotsFilePath = resolveFilePathRelativeToSrc("__snapshots__/App.test.tsx.snap");
        appTestFilePath = resolveFilePathRelativeToSrc("App.test.tsx");
        appWrongTextHeadingFilePath = resolveFilePathRelativeToTest(
            "app-versions/AppWrongTextHeading.tsx"
        );

        commonConfig = {
            env: {
                browser: true,
                es2022: true,
            },
            parserOptions: {
                sourceType: "module",
                allowImportExportEverywhere: true,
            },
            plugins: ["jest"],
        };
    });

    it("all unit-tests should pass", () => {
        const { areAllTestsPassed } = runTests();

        expect(areAllTestsPassed).equal(true);
    }).timeout(defaultTimeout);

    it("tests style should fit requirements", async () => {
        const { areAllTestsPassed } = runTests();

        const consistentTestItRuleId = "jest/consistent-test-it";
        const noIdenticalTitleRuleId = "jest/no-identical-title";
        const noDisabledTestsRuleId = "jest/no-disabled-tests";
        const noCommentedOutTestsRuleId = "jest/no-commented-out-tests";

        const rules = [
            consistentTestItRuleId,
            noIdenticalTitleRuleId,
            noDisabledTestsRuleId,
            noCommentedOutTestsRuleId,
        ];

        const baseConfig = mergeConfigWithCommon({
            rules: {
                [consistentTestItRuleId]: "error",
                [noIdenticalTitleRuleId]: "error",
                [noDisabledTestsRuleId]: "error",
                [noCommentedOutTestsRuleId]: "error",
            },
        });

        eslint = new ESLint({ baseConfig });

        const lintResult = await eslint.lintFiles(appTestFilePath);

        const allMessages = lintResult[0].messages;
        const errorMessages = allMessages.filter((message) =>
            rules.includes(message.ruleId)
        );

        if (errorMessages.length > 0) {
            console.error(errorMessages);
        }

        expect(areAllTestsPassed && errorMessages.length === 0).equal(true);
    }).timeout(defaultTimeout);

    describe("1. Snapshot testing", function () {
        it(`should have have a test with correct title`, () => {
            const { assertionResults } = runTests();

            const test = assertionResults.find(
                (test) => test.title === snapshotTestText
            );

            expect(!!test).to.be.true;
        }).timeout(defaultTimeout);

        it(`a test with a correct title should pass`, () => {
            const { assertionResults } = runTests();

            const test = assertionResults.find(
                (test) => test.title === snapshotTestText
            );

            expect(test?.status).to.equal("passed");
        }).timeout(defaultTimeout);

        it(`should have have test with a correct title when menu openning`, () => {
            const { assertionResults } = runTests();

            const test = assertionResults.find(
                (test) => test.title === snapshotTestTextAfterMenuOpenning
            );

            expect(!!test).to.be.true;
        }).timeout(defaultTimeout);

        it(`a snapshot test with openning menu should pass`, () => {
            const { assertionResults } = runTests();

            const test = assertionResults.find(
                (test) => test.title === snapshotTestTextAfterMenuOpenning
            );

            expect(test?.status).to.equal("passed");
        }).timeout(defaultTimeout);

        it("should have a file with snapshot", async () => {
            const { fileExists, fileEmpty } = await checkFileExistance(
                appSnapshotsFilePath
            );

            expect(fileExists && !fileEmpty).equal(true);
        }).timeout(defaultTimeout);
    });

    describe("2. Check correct page heading", function () {
        it(`should have have a test with correct title`, () => {
            const { assertionResults } = runTests();

            const test = assertionResults.find(
                (test) => test.title === correctPageHeadingTestText
            );

            expect(!!test).to.be.true;
        }).timeout(defaultTimeout);

        it(`a test with a correct title should pass`, () => {
            const { assertionResults } = runTests();

            const test = assertionResults.find(
                (test) => test.title === correctPageHeadingTestText
            );

            expect(test?.status).to.equal("passed");
        }).timeout(defaultTimeout);
    });

    describe("3. Check that button text changes after click", function () {
        it(`should have have a test with correct title for single click`, () => {
            const { assertionResults } = runTests();

            const test = assertionResults.find(
                (test) => test.title === buttonTextAfterClickingTestText
            );

            expect(!!test).to.be.true;
        }).timeout(defaultTimeout);

        it(`a test with a correct title for single click should pass`, () => {
            const { assertionResults } = runTests();

            const test = assertionResults.find(
                (test) => test.title === buttonTextAfterClickingTestText
            );

            expect(test?.status).to.equal("passed");
        }).timeout(defaultTimeout);

        it(`should have have a test with correct title for double clicks`, () => {
            const { assertionResults } = runTests();

            const test = assertionResults.find(
                (test) => test.title === buttonTextAfterClickingTwiceTestText
            );

            expect(!!test).to.be.true;
        }).timeout(defaultTimeout);

        it(`a test with a correct title for double clicks should pass`, () => {
            const { assertionResults } = runTests();

            const test = assertionResults.find(
                (test) => test.title === buttonTextAfterClickingTwiceTestText
            );

            expect(test?.status).to.equal("passed");
        }).timeout(defaultTimeout);
    });

    describe("4. Check to make sure the menu appears after clicking the button", function () {
        it(`should have have a test with correct title`, () => {
            const { assertionResults } = runTests();

            const test = assertionResults.find(
                (test) => test.title === menuAfterClickingButtonTestText
            );

            expect(!!test).to.be.true;
        }).timeout(defaultTimeout);

        it(`a test with a correct title should pass`, () => {
            const { assertionResults } = runTests();

            const test = assertionResults.find(
                (test) => test.title === menuAfterClickingButtonTestText
            );

            expect(test?.status).to.equal("passed");
        }).timeout(defaultTimeout);
    });

    describe("5. Check to make sure there is a list with four options inside the `<nav>` element.", function () {
        it(`should have have a test with correct title`, () => {
            const { assertionResults } = runTests();

            const test = assertionResults.find(
                (test) => test.title === menuItemsTestText
            );

            expect(!!test).to.be.true;
        }).timeout(defaultTimeout);

        it(`a test with a correct title should pass`, () => {
            const { assertionResults } = runTests();

            const test = assertionResults.find(
                (test) => test.title === menuItemsTestText
            );

            expect(test?.status).to.equal("passed");
        }).timeout(defaultTimeout);
    });

    function runTests() {
        let areAllTestsPassed = false;
        let assertionResults = [];

        try {
            const result = execSync(`jest --reporters=default --json`, {
                encoding: "utf8",
                stdio: "pipe",
            });
            const resultJSON = getJSONFromNonEscapedString(result);

            assertionResults = resultJSON?.testResults[0]?.assertionResults;

            areAllTestsPassed =
                !!resultJSON &&
                resultJSON.numPassedTestSuites === 1 &&
                resultJSON.numFailedTests === 0;
        } catch (error) {
            // console.error("ERROR: ", error.toString());
        }

        return {
            assertionResults,
            areAllTestsPassed,
        };
    }

    function getJSONFromNonEscapedString(nonEscapedJSON) {
        try {
            return JSON.parse(nonEscapedJSON.replace(/\\/gi, "|"));
        } catch (error) {
            return null;
        }
    }

    function mergeConfigWithCommon(baseConfig) {
        return Object.assign({}, commonConfig, baseConfig);
    }
});
