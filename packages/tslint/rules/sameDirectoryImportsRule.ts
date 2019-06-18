import * as Lint from 'tslint';
import * as ts from 'typescript';
import * as path from 'path';

export class Rule extends Lint.Rules.AbstractRule {
  public static FAILURE_STRING = 'import outside directory forbidden';

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithWalker(
      new NoImportsWalker(sourceFile, this.getOptions()),
    );
  }
}

// The walker takes care of all the work.
class NoImportsWalker extends Lint.RuleWalker {
  public visitImportDeclaration(node: ts.ImportDeclaration) {
    // Key for the map
    const currentImportStatement = node.moduleSpecifier
      .getText()
      .replace(/\'/g, '');

    if (
      !node.moduleSpecifier.getSourceFile().hasOwnProperty('resolvedModules')
    ) {
      return;
    }

    const map = node.moduleSpecifier.getSourceFile()['resolvedModules'];

    /**
     * Get src file & target file
     */
    const srcAbsFilePath = node.moduleSpecifier.getSourceFile()[
      'originalFileName'
    ];

    if (map.get(currentImportStatement) === undefined) return;

    const importedAbsFilePath = map.get(currentImportStatement)
      .resolvedFileName;

    // console.log('\n');
    // console.log(`originalFileName: ${srcAbsFilePath}`);
    // console.log(`targetAbsoluteImport: ${importedAbsFilePath}`);

    /**
     * Get matched string
     */
    const matchingString = this.getMatchingString(
      srcAbsFilePath,
      importedAbsFilePath,
    );

    // console.log(`matchingString: ${matchingString}`);

    /**
     * Remove matching path
     */
    const srcFileName = srcAbsFilePath.replace(matchingString, '');
    const importedFileName = importedAbsFilePath.replace(matchingString, '');

    // console.log('\n');
    // console.log(srcFileName);
    // console.log(importedFileName);

    /*
     If "/" exists in importedFileName, it means it's importing from a different directory
     create a failure at the current position
     */
    if (
      importedFileName.indexOf('/_') > -1 &&
      importedFileName.indexOf('/__') < 0
    ) {
      // console.log(node.getStart());
      // console.log(node.getWidth());
      this.addFailure(
        this.createFailure(
          node.getStart(),
          node.getWidth(),
          Rule.FAILURE_STRING,
        ),
      );
    }

    // call the base version of this visitor to actually parse this node
    // super.visitImportDeclaration(node);
  }

  private getMatchingString(str1, str2) {
    const arr1 = str1.split(/\b/);
    const arr2 = str2.split(/\b/);

    // initialize variable for result
    let str = '';

    // iterate over the split array
    for (let i = 0; i < arr1.length; i += 1) {
      // check current word includes in the array and check
      // the combined word is in string, then concate with str
      if (arr2.includes(arr1[i]) && str2.indexOf(str + arr1[i]) > -1) {
        str += arr1[i];
      }
      // if string doesn't match and result length is greater
      // than 0 then break the loop
      else if (str.trim()) break;
    }

    return str.trim();
  }
}
