/// <reference path="./Button.ts" />
class VolumeControl {
    private musicVolumeControl: VolumeControlElement;
    private sfxVolumeControl: VolumeControlElement;

    private currentMusic: p5.SoundFile;

    public musicVolume: number = 3;
    public sfxVolume: number;

    buttonSize: number = 0.75;

    constructor() {
    }

    setup() {
        // Create music volume button
        const musicButtonX = CANVAS_WIDTH - buttonMusicIdle.width * this.buttonSize - 10;
        const musicButtonY = 10;
        this.musicVolumeControl = new VolumeControlElement({
            positionX: musicButtonX,
            positionY: musicButtonY,
            spriteIdle: buttonMusicIdle,
            spriteHover: buttonMusicHover,
            spriteDisabled: buttonMusicDisabled,
            spriteDisabledHover: buttonMusicDisabledHover,
            sizeMultiplierOnPressed: 0.75,
            size: this.buttonSize,
            wobble: true
        }, 100, 10, this.musicVolume);
        this.musicVolumeControl.setup();


        const sfxButtonX = CANVAS_WIDTH - buttonMusicIdle.width * this.buttonSize * 2 - 10 * 2;
        const sfxButtonY = 10;
        // Create sound effects volume button
        this.sfxVolumeControl = new VolumeControlElement({
            positionX: sfxButtonX,
            positionY: sfxButtonY,
            spriteIdle: buttonSoundIdle,
            spriteHover: buttonSoundHover,
            spriteDisabled: buttonSoundDisabled,
            spriteDisabledHover: buttonSoundDisabledHover,
            sizeMultiplierOnPressed: 0.75,
            size: 0.75,
            wobble: true
        }, 100, 10, 5);
        this.sfxVolumeControl.setup();
    }

    draw() {
        this.musicVolumeControl.draw();
        this.sfxVolumeControl.draw();

        if (this.musicVolume !== this.musicVolumeControl.currentValue) {
            this.musicVolume = this.musicVolumeControl.currentValue;
            console.log('changed music volume to ' + this.musicVolume);
            this.changeMusicVolume();
        }
        if (this.sfxVolume !== this.sfxVolumeControl.currentValue) {
            this.sfxVolume = this.sfxVolumeControl.currentValue;
        }
    }

    changeMusicVolume() {
        if (this.currentMusic) {
            this.currentMusic.setVolume(this.musicVolume);
        }
    }

    public playMusic(music: p5.SoundFile) {
        this.currentMusic = music;
        this.currentMusic.setVolume(this.musicVolume);
        this.currentMusic.play();
    }
}

const volumeControl = new VolumeControl();
