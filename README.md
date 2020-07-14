# ShaderMapper

ShaderMapper is a basic projection mapping, VJ, and lighting design tool based in Three.js and designed primarily to be run as a local web app on the Raspberry Pi.

#### Mapping and VJ Features
- Multi object quad and grid warping of content written in GLSL fragment shaders. *(video playback not supported at this time due to limitations of the pi)*
- Simultanenos playback of 2 shaders assigned to up to four objects *(althought he pi could probably handle a good but more than this if desired)*
- Can dynamically cycle through a bank of pre-defined fragment shaders and select from a bank of still images which can be used for masking or other manipulation within the shaders.
- Mouse and audio data are available to the fragment shaders as uniform inputs. 
- Controls are available both onscreen and via keyboard shortcuts *(can be critical in situations where your only monitori is a projector)*
- All setting can be stored and recalled as presets, allowing for the easy creation and playback of VJ type scenes.

#### DMX/ArtNet/Lighting Features
- DMX Features are just beyond proof of concept stage.
- Adding fixture, scene, and patching controls will be required before this is ready for public use.
- This is basically a custom UI on top of OLA, current code will not attempt to send DMX if OLA isn't setup (and reverse proxied) on your system.




## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
Give examples
```

### Installing

A step by step series of examples that tell you how to get a development env running

Say what the step will be

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
