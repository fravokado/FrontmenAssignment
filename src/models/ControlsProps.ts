export default interface ControlsProps {
    timerEnabled: boolean;
    fetchJokes(): any;
    handleTimer(enabled: boolean): any;
}