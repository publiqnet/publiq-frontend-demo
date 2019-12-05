export declare function playerFactory(): {
    play(name?: string): void;
    stop(name?: string): void;
    setSpeed(speed: number, name?: string): void;
    setDirection(direction: import("lottie-web").AnimationDirection, name?: string): void;
    searchAnimations(animationData?: any, standalone?: boolean, renderer?: string): void;
    loadAnimation(params: import("lottie-web").AnimationConfigWithPath | import("lottie-web").AnimationConfigWithData): import("lottie-web").AnimationItem;
    destroy(name?: string): void;
    registerAnimation(element: Element, animationData?: any): void;
    setQuality(quality: string | number): void;
};
export declare class AtomsModule {
}
