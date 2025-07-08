
        const passwordDisplay = document.getElementById('password');
        const copyBtn = document.getElementById('copy-btn');
        const lengthSlider = document.getElementById('length');
        const lengthValue = document.getElementById('length-value');
        const uppercaseCheckbox = document.getElementById('uppercase');
        const lowercaseCheckbox = document.getElementById('lowercase');
        const numbersCheckbox = document.getElementById('numbers');
        const symbolsCheckbox = document.getElementById('symbols');
        const generateBtn = document.getElementById('generate');
        const strengthBar = document.getElementById('strength-bar');


        const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
        const numberChars = '0123456789';
        const symbolChars = '!@#$%^&*()_+~`|}{[]\:;?><,./-=';


        lengthSlider.addEventListener('input', function() {
            lengthValue.textContent = this.value;
        });


        function generatePassword() {
            let length = lengthSlider.value;
            let allowedChars = '';
            let password = '';
            
            if (uppercaseCheckbox.checked) allowedChars += uppercaseChars;
            if (lowercaseCheckbox.checked) allowedChars += lowercaseChars;
            if (numbersCheckbox.checked) allowedChars += numberChars;
            if (symbolsCheckbox.checked) allowedChars += symbolChars;
            
            if (allowedChars.length === 0) {
                alert('Por favor, selecione pelo menos um tipo de caractere!');
                return;
            }
            
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * allowedChars.length);
                password += allowedChars[randomIndex];
            }
            
            passwordDisplay.textContent = password;
            updateStrengthMeter(password);
        }

        function updateStrengthMeter(password) {
            let strength = 0;
            

            if (password.length > 10) strength += 2;
            else if (password.length > 6) strength += 1;
            
            const hasUppercase = /[A-Z]/.test(password);
            const hasLowercase = /[a-z]/.test(password);
            const hasNumbers = /[0-9]/.test(password);
            const hasSymbols = /[^A-Za-z0-9]/.test(password);
            
            const varietyCount = [hasUppercase, hasLowercase, hasNumbers, hasSymbols].filter(Boolean).length;
            strength += varietyCount;
            
            let width = 0;
            let color = '#ff0000'; // Vermelho (fraca)
            
            if (strength >= 5) {
                width = 100;
                color = '#00ff00'; // Verde (forte)
            } else if (strength >= 3) {
                width = 66;
                color = '#ffa500'; // Laranja (média)
            } else {
                width = 33;
            }
            
            strengthBar.style.width = width + '%';
            strengthBar.style.backgroundColor = color;
        }

        function copyToClipboard() {
            const password = passwordDisplay.textContent;
            if (password && password !== 'Clique em "Gerar Senha"') {
                navigator.clipboard.writeText(password);
                copyBtn.textContent = 'Copiado!';
                setTimeout(() => {
                    copyBtn.textContent = 'Copiar';
                }, 2000);
            }
        }

        generateBtn.addEventListener('click', generatePassword);
        copyBtn.addEventListener('click', copyToClipboard);

        generatePassword();
