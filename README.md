<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<div align="center">
  <h3 align="center">GitGraph</h3>

  <p align="center">
    An innovative tool for dynamic visualization of Python codebases.
    <br />
    <a href="https://github.com/shreshthgoyal/gitgraph">View Demo</a>
    ·
    <a href="https://github.com/shreshthgoyal/gitgraph/issues/new?labels=bug">Report Bug</a>
    ·
    <a href="https://github.com/shreshthgoyal/gitgraph/issues/new?labels=enhancement">Request Feature</a>
  </p>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

## About The Project

![](https://i.ibb.co/RjFDsJp/image.png)

GitGraph dynamically generates interactive visualizations of dependencies and relationships within a Python codebase, leveraging Tree-sitter for parsing and d3.js for rendering.

### Built With

* [Tree-sitter](https://tree-sitter.github.io/tree-sitter/)
* [d3.js](https://d3js.org/)
* [Python](https://www.python.org/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started

### Prerequisites

* Node.js and npm
  ```sh
  npm install npm@latest -g
### Installation

1.  Clone the GitGraph repo

    `git clone https://github.com/shreshthgoyal/gitgraph.git` 
    
2.  Install NPM packages
    
    `npm install` 
    
3.  Start the project

    `npm start` 
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage

GitGraph is designed with an intuitive interface to offer a seamless experience in visualizing and understanding Python codebases. To get started with GitGraph, follow these simple steps:

1. **Codebase Selection**: Add the Python codebase's GitHub username and repository name in the designated fields. This action initiates the visualization process, allowing GitGraph to dynamically generate an interactive graph of the codebase.

2. **Interactive Graph Navigation**:
   - **Drag and Place**: The nodes representing functions, classes, and files in the graph are interactive. You can drag and position them anywhere on the canvas to organize the view according to your preference.
   - **Zoom**: Use the zoom in and out features to adjust the graph's view. This functionality allows you to focus on specific details or get an overview of the entire codebase structure.

3. **Detailed Analysis**:
   - **Sidebar Information**: Hovering over nodes and links activates a sidebar that displays detailed information, such as the list of neighbor nodes and the functions imported from each file. This feature provides quick insights into the codebase's structure and dependencies.
   - **Hyperlinks**: Each file represented in the graph is hyperlinked to its respective location in the GitHub repository. This direct link enables quick access to the source code for in-depth analysis.

4. **Function Definitions**:
   - **Quick View Modal**: Clicking on a function node within the graph opens a modal window displaying the function's definition. This quick view feature allows for an immediate understanding of the function's purpose and implementation without navigating away from the graph.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Roadmap

-   Add support for additional programming languages
-   Introduce more interactive features
-   Optimize performance

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contributing

Contributions are greatly appreciated. For any contributions, please fork the repo and create a pull request.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contact

Shreshth Goyal - [@shreshthg30](https://twitter.com/shreshthg30)

Project Link: [https://github.com/shreshthgoyal/gitgraph](https://github.com/shreshthgoyal/gitgraph)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Acknowledgments

-   [Node.js](https://nodejs.org/)
-   [npm](https://npmjs.com/)
<p align="right">(<a href="#readme-top">back to top</a>)</p>
