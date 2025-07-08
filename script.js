        // Elementos do DOM
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

        // Conjuntos de caracteres
        const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
        const numberChars = '0123456789';
        const symbolChars = '!@#$%^&*()_+~`|}{[]\:;?><,./-=';

        // Atualiza o valor exibido do slider
        lengthSlider.addEventListener('input', function() {
            lengthValue.textContent = this.value;
        });

        // Função para gerar senha
        function generatePassword() {
            let length = lengthSlider.value;
            let allowedChars = '';
            let password = '';
            
            // Verifica quais conjuntos de caracteres foram selecionados
            if (uppercaseCheckbox.checked) allowedChars += uppercaseChars;
            if (lowercaseCheckbox.checked) allowedChars += lowercaseChars;
            if (numbersCheckbox.checked) allowedChars += numberChars;
            if (symbolsCheckbox.checked) allowedChars += symbolChars;
            
            // Se nenhum conjunto foi selecionado, mostra mensagem de erro
            if (allowedChars.length === 0) {
                alert('Por favor, selecione pelo menos um tipo de caractere!');
                return;
            }
            
            // Gera a senha aleatória
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * allowedChars.length);
                password += allowedChars[randomIndex];
            }
            
            // Exibe a senha e atualiza o medidor de força
            passwordDisplay.textContent = password;
            updateStrengthMeter(password);
        }

        // Função para calcular a força da senha
        function updateStrengthMeter(password) {
            let strength = 0;
            
            // Verifica o comprimento

            if (password.length > 10) strength += 2;
            else if (password.length > 6) strength += 1;
            
            // Verifica a variedade de caracteres
            const hasUppercase = /[A-Z]/.test(password);
            const hasLowercase = /[a-z]/.test(password);
            const hasNumbers = /[0-9]/.test(password);
            const hasSymbols = /[^A-Za-z0-9]/.test(password);
            
            const varietyCount = [hasUppercase, hasLowercase, hasNumbers, hasSymbols].filter(Boolean).length;
            strength += varietyCount;
            
            // Atualiza a barra de força visualmente
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

        // Função para copiar a senha
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

        // Event listeners
        generateBtn.addEventListener('click', generatePassword);
        copyBtn.addEventListener('click', copyToClipboard);

        // Gera uma senha inicial ao carregar a página
        generatePassword();