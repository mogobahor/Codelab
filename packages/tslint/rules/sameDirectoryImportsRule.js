"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Lint = require("tslint");
var Rule = /** @class */ (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NoImportsWalker(sourceFile, this.getOptions()));
    };
    Rule.FAILURE_STRING = 'import outside directory forbidden';
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
// The walker takes care of all the work.
var NoImportsWalker = /** @class */ (function (_super) {
    __extends(NoImportsWalker, _super);
    function NoImportsWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoImportsWalker.prototype.visitImportDeclaration = function (node) {
        // Key for the map
        var currentImportStatement = node.moduleSpecifier
            .getText()
            .replace(/\'/g, '');
        if (!node.moduleSpecifier.getSourceFile().hasOwnProperty('resolvedModules')) {
            return;
        }
        var map = node.moduleSpecifier.getSourceFile()['resolvedModules'];
        /**
         * Get src file & target file
         */
        var srcAbsFilePath = node.moduleSpecifier.getSourceFile()['originalFileName'];
        if (map.get(currentImportStatement) === undefined)
            return;
        var importedAbsFilePath = map.get(currentImportStatement)
            .resolvedFileName;
        // console.log('\n');
        // console.log(`originalFileName: ${srcAbsFilePath}`);
        // console.log(`targetAbsoluteImport: ${importedAbsFilePath}`);
        /**
         * Get matched string
         */
        var matchingString = this.getMatchingString(srcAbsFilePath, importedAbsFilePath);
        // console.log(`matchingString: ${matchingString}`);
        /**
         * Remove matching path
         */
        var srcFileName = srcAbsFilePath.replace(matchingString, '');
        var importedFileName = importedAbsFilePath.replace(matchingString, '');
        // console.log('\n');
        // console.log(srcFileName);
        // console.log(importedFileName);
        /*
         If "/" exists in importedFileName, it means it's importing from a different directory
         create a failure at the current position
         */
        if (importedFileName.indexOf('/_') > -1 &&
            importedFileName.indexOf('/__') < 0) {
            // console.log(node.getStart());
            // console.log(node.getWidth());
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
        }
        // call the base version of this visitor to actually parse this node
        // super.visitImportDeclaration(node);
    };
    NoImportsWalker.prototype.getMatchingString = function (str1, str2) {
        var arr1 = str1.split(/\b/);
        var arr2 = str2.split(/\b/);
        // initialize variable for result
        var str = '';
        // iterate over the split array
        for (var i = 0; i < arr1.length; i += 1) {
            // check current word includes in the array and check
            // the combined word is in string, then concate with str
            if (arr2.includes(arr1[i]) && str2.indexOf(str + arr1[i]) > -1) {
                str += arr1[i];
            }
            // if string doesn't match and result length is greater
            // than 0 then break the loop
            else if (str.trim())
                break;
        }
        return str.trim();
    };
    return NoImportsWalker;
}(Lint.RuleWalker));
