/// <reference path="./Button.ts" />
class VolumeControl {
    public musicVolumeControl: VolumeControlElement;
    public sfxVolumeControl: VolumeControlElement;

    private currentMusic: p5.SoundFile;

    public musicVolume: number = 1;
    public sfxVolume: number = 2;

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
        }, 100, 5, this.musicVolume);
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
        }, 100, 5, this.sfxVolume);
        this.sfxVolumeControl.setup();

        const savedMusicVolume = localStorage.getItem('musicVolume');
        const savedSfxVolume = localStorage.getItem('sfxVolume');
        if (savedMusicVolume) {
            this.musicVolumeControl.slider.value(parseFloat(savedMusicVolume));
            this.musicVolume = parseFloat(savedMusicVolume);
        }
        if (savedSfxVolume) {
            this.sfxVolumeControl.slider.value(parseFloat(savedSfxVolume));
            this.sfxVolume = parseFloat(savedSfxVolume);
        }
    }

    draw() {
        this.musicVolumeControl.draw();
        this.sfxVolumeControl.draw();

        if (this.musicVolume !== this.musicVolumeControl.currentValue) {
            this.musicVolume = this.musicVolumeControl.currentValue;
            this.changeMusicVolume(this.musicVolumeControl.currentValue);
        }
        if (this.sfxVolume !== this.sfxVolumeControl.currentValue) {
            this.changeSfxVolume(this.sfxVolumeControl.currentValue);
        }
    }

    changeSfxVolume(volume: number) {
        localStorage.setItem('sfxVolume', volume.toString());
        this.sfxVolume = volume
    }

    changeMusicVolume(volume: number) {
        localStorage.setItem('musicVolume', volume.toString());
        this.musicVolume = volume;
        if (this.currentMusic) {
            this.currentMusic.setVolume(this.musicVolume);
        }
    }

    public playMusic(music: p5.SoundFile) {
        if (music === this.currentMusic) return
        this.currentMusic?.stop();
        this.currentMusic = music;
        this.currentMusic.setVolume(this.musicVolume);
        this.currentMusic.loop();
    }

    public stopMusic() {
        if (this.currentMusic.isLooping()) {
            this.currentMusic.stop();
        }
    }

    public playSound(sfx: p5.SoundFile) {
        sfx.setVolume(this.sfxVolume);
        const shift = random(0.7, 1.3);
        sfx.rate(shift);
        sfx.play();
        sfx.rate(1);
    }


}

const volumeControl = new VolumeControl();
