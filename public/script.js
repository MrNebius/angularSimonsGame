angular.module('SimonsGameApp', [])
    .controller('myCtrl', function myCtrl($timeout,$scope) {

        this.initArray = () => {
            return new Array(4).fill(true)
        };

        this.difficultyButtons = {
            Hard: 100,
            Medium: 250,
            Easy: 500
        };
        this.fieldButtons = this.initArray();
        this.timeout;
        this.difficulty = this.difficultyButtons.Easy;
        this.comboArr = [];
        this.inputComboCounter = 0;
        this.isStrictMode = false;
        this.isBlockField = true;

        this.gameStarter = (start, isGuessed, isContinue) => {
            this.inputComboCounter = 0;
            this.isBlockField = true;
            clearTimeout(this.timeout);

            if (!isContinue) {
                this.fieldButtons = this.initArray();
                this.comboArr = [];
            }
            if (start) {
                if (isGuessed) this.comboArr.push((Math.floor(Math.random() * 4)));
                return this.renderCombo(this.comboArr, this.difficulty + 1000)
            }
        };

        this.config = (newDifficulty, changeStrictMode) => {
            this.gameStarter(false, false);
            if (newDifficulty) {
                this.difficulty = newDifficulty;
            }
            if (changeStrictMode) {
                this.isStrictMode = !this.isStrictMode;
            }
        };

        this.renderCombo = (arr, difficulty, index = 0) => {
            return this.delay(difficulty)
                .then(() => {
                    $scope.$apply(() => {
                        let newIndex = index;
                        if (this.fieldButtons[arr[index]]) {
                            newIndex++;
                        }
                        this.fieldButtons[arr[index]] = !this.fieldButtons[arr[index]] ;
                        if (arr.length === newIndex) {
                            this.isBlockField = false;
                            return
                        }
                        return this.renderCombo(arr, this.difficulty, newIndex);
                    });
                })
        };

        this.delay = delay => new Promise((resolve, reject) => this.timeout = setTimeout(() => resolve(), delay));

        this.checkWin = num => {
            const win = (num === this.comboArr[this.inputComboCounter]);
            this.inputComboCounter += 1;

            if (this.inputComboCounter === this.comboArr.length || !win) {
                if (!win) alert('Try again');
                if (this.comboArr.length === 20 && win) {
                    alert('CONGRATULATIONS you win the game');
                    this.isBlockField = true;
                } else if (this.isStrictMode && !win) {
                    return this.gameStarter(true, true)
                }
                else {
                    return this.gameStarter(true, win, true)
                }
            }
        };
    });