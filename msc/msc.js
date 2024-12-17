function hash(a) {
            let str = a.toString();
            if (!str || /^0+$/.test(str)) return '[random]';
            if (/^-?\d+$/.test(str) && str.length < 20) return str.replace(/^(-?)0+/, '$1');
            let hash = 0;
            for (let i = 0; i < str.length; i++) {
                let character = str.charCodeAt(i);
                hash = ((hash << 5) - hash) + character;
                hash = hash & hash; // Convert to 32-bit integer
            }
            return hash;
        }

        function submitSeed() {
            const seedInput = document.getElementById('seed').value;
            const output = document.getElementById('output');
            output.textContent = 'Output seed: ' + hash(seedInput);
        }
