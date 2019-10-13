import React, { Component, createRef } from "react";
import { Grommet, Box, Button } from "grommet";
import { PauseFill, PlayFill } from "grommet-icons";
import OrbitalBody, { BodyProperties } from "./OrbitalBody";
import System from "./System";
import Renderer from "./Renderer";
import DateSelector from "./DateSelector";

interface AppProps {
  baseAu: number;
  bodies: BodyProperties[];
  /**
   * Period 1 bodies take # seconds long to complete orbit
   */
  timeScale: number;
  debug: boolean;
}
interface AppState {
  timeScale: number;
  ticks: number;
  lastFrame: number;
  renderer?: Renderer;
}

const getInitialSystem = ({ baseAu: au, bodies, debug }: AppProps) => {
  const system = new System({ au }, debug);
  bodies.forEach(moonProps => {
    const body = new OrbitalBody({
      ...moonProps,
      system
    });
    system.addBody(body);
  });
  return system;
};
const getInitialRenderer = node => new Renderer(node);
const getInitialTimeScale = (props: AppProps) => props.timeScale;

class App extends Component<AppProps, AppState> {
  readonly system: System = getInitialSystem(this.props);
  readonly epoch = new Date().valueOf();
  readonly state = {
    lastFrame: new Date().valueOf(),
    timeScale: getInitialTimeScale(this.props),
    renderer: null,
    ticks: 0
  };
  private sceneRef = createRef<HTMLDivElement>();
  componentDidMount() {
    this.setState({ renderer: getInitialRenderer(this.sceneRef.current) });
    this.frame();
  }
  ticksSinceLastFrame(currentWallClock: number) {
    return (
      ((currentWallClock - this.state.lastFrame) / 1000) * this.state.timeScale
    );
  }
  frame = () => {
    const currentWallClock = new Date().valueOf();
    this.setState({
      ticks: this.state.ticks + this.ticksSinceLastFrame(currentWallClock),
      lastFrame: currentWallClock
    });

    requestAnimationFrame(this.frame);
    return Promise.resolve(void 0);
  };
  componentDidUpdate() {
    this.system.moveToTick(this.state.ticks);
    this.state.renderer.render(this.system.scene);
  }

  render() {
    const { ticks } = this.state;
    return (
      <Grommet plain>
        <Box direction="column" height="100vh">
          <Box
            direction="row"
            pad="medium"
            align="center"
            justify="start"
            gap="small"
            background="brand"
          >
            <DateSelector
              ticks={ticks}
              onClick={() => this.setState({ timeScale: 0 })}
              onBlur={ticks => this.setState({ ticks })}
            />
            <Button
              icon={<PlayFill />}
              label="Play"
              onClick={() => this.setState({ timeScale: 1 })}
            />
            <Button
              icon={<PauseFill />}
              label="Pause"
              onClick={() => this.setState({ timeScale: 0 })}
            />
          </Box>
          <Box id="scene" ref={this.sceneRef} flex />
        </Box>
      </Grommet>
    );
  }
}

export default App;
