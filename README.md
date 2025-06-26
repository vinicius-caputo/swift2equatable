# swift2equatable

`swift2equatable` is a tool to automatically generate Swift code for structs and enums to conform to the `Equatable` protocol.

By default, writing `Equatable` conformance manually can be tedious and error-prone, especially for complex models with nested structures or enums. This tool simplifies the process by generating the required code automatically, saving time and reducing errors.

# Quick Links
#### Website
- [Online converter website](https://vinicius-caputo.github.io/swift2equatable/)
#### Documentation
- [How to Use](#how-to-use)
- [How It Works](#how-it-works)
- [How to Contribute](#how-to-contribute)
- [Found a Bug?](#issue)
- [Submitting an Issue](#submit-issue)
- [Submitting a Pull Request (PR)](#submit-pr)

# <a name="how-to-use"></a> How to Use

The simplest way to use this tool is by accessing the [online converter website](https://vinicius-caputo.github.io/swift2equatable/). Paste your Swift code in the left text area, and the generated `Equatable` conformance code will appear in the right text area.

Alternatively, you can use the command-line tool:

1. Clone this repository:
   ```bash
   git clone https://github.com/vinicius-caputo/swift2equatable.git
   cd swift2equatable
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the project:
   ```bash
   npm run build
   ```

Or download the pre-built binary from the releases folder and run the command below:

4. Make the binary executable:
   ```bash
   chmod +x release/swift2equatable-<linux/mac/win>
   ```

5. Run the tool:
   ```bash
   ./release/swift2equatable-<linux/mac/win> -p <path-to-swift-file> -o <output-path>
   ```

Command-line options:
- `-p, --path`: Path to the Swift file.
- `-s, --string`: Provide Swift code as a string.
- `-o, --outputPath`: Path to save the generated code.
- `-ur, --useRetroactive`: Use `@retroactive` protocol conformance.
- `-up, --usePublic`: Add `public` visibility to the generated code.

# <a name="how-it-works"></a> How It Works

The tool processes Swift code in the following steps:

1. **Parsing**: The `Parser` class analyzes the Swift code to extract structs, enums, and their properties.
2. **Code Generation**: The `swift2equatableConverter` class generates the `Equatable` conformance code for the parsed structs and enums.
3. **Customization**: Options like `public` visibility and `@retroactive` conformance can be applied during code generation.

The website code is located in the `website` folder. It uses a simple HTML page with a bundled `main.ts` file to provide an interactive interface for the tool.

# <a name="how-to-contribute"></a> How to Contribute

First of all, thank you for wanting to contribute to this project! There are some guidelines to follow to ensure smooth collaboration.

You can work on open issues in the [issue tracker](https://github.com/vinicius-caputo/swift2equatable/issues) or create a new issue if you find a bug or have a feature suggestion. See the [issue section](#issue) for more details.

After a merge request is accepted, GitHub Actions will build and deploy the updated version of the online converter website.

## <a name="issue"></a> Found a Bug?

If you find a bug in the source code, you can help us by [submitting an issue](#submit-issue). Even better, you can [submit a Pull Request](#submit-pr) with a fix.

## <a name="submit-issue"></a> Submitting an Issue

Before submitting an issue, please search the [issue tracker](https://github.com/vinicius-caputo/swift2equatable/issues). An issue for your problem might already exist, and the discussion might provide workarounds.

To help us reproduce and fix the issue, provide a minimal example or a clear description of the problem. If possible, include a code snippet or a link to a repository that reproduces the issue.

## <a name="submit-pr"></a> Submitting a Pull Request (PR)

When submitting a PR, please follow these guidelines:

- Use descriptive commit messages with one of the following prefixes:
  - `[feature]` - for new features
  - `[improvement]` - for improvements to existing features
  - `[fix]` - for bug fixes
  - `[docs]` - for documentation changes
  - `[refactoring]` - for code refactoring
  - `[website]` - for website updates

- Include a detailed description of the changes in the PR message.
- If fixing an issue, reference the issue number in the commit message, e.g., `[fix] - Fix issue #1`.

----------
Thank you for reading this, and we hope you enjoy using `swift2equatable`!