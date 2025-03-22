// RNA Codon to Amino Acid Map
const codonToAminoAcid = {
    "UUU": "Phe", "UUC": "Phe", "UUA": "Leu", "UUG": "Leu",
    "CUU": "Leu", "CUC": "Leu", "CUA": "Leu", "CUG": "Leu",
    "AUU": "Ile", "AUC": "Ile", "AUA": "Ile", "AUG": "Met (Start)",
    "GUU": "Val", "GUC": "Val", "GUA": "Val", "GUG": "Val",
    "UAA": "STOP", "UAG": "STOP", "UGA": "STOP"
};

// Convert DNA to RNA and Generate Codons
function convertDNA() {
    let dnaSequence = document.getElementById("dnaInput").value.toUpperCase().trim();
    
    if (!/^[ATCG]+$/.test(dnaSequence)) {
        document.getElementById("rnaOutput").innerText = "Invalid DNA Sequence!";
        return;
    }

    let rnaSequence = dnaSequence.replace(/T/g, "U");
    document.getElementById("rnaOutput").innerText = rnaSequence;

    // Generate Codons
    let codons = [];
    let aminoAcids = [];
    for (let i = 0; i < rnaSequence.length; i += 3) {
        let codon = rnaSequence.substring(i, i + 3);
        if (codon.length === 3) {
            codons.push(codon);
            aminoAcids.push(codonToAminoAcid[codon] || "Unknown");
        }
    }

    // Display Codons & Amino Acids
    let codonList = document.getElementById("codonList");
    codonList.innerHTML = "";
    codons.forEach((codon, index) => {
        let li = document.createElement("li");
        li.innerHTML = `<strong>${codon}</strong> → ${aminoAcids[index]}`;
        codonList.appendChild(li);
    });
}

// Copy RNA Sequence
function copyRNA() {
    navigator.clipboard.writeText(document.getElementById("rnaOutput").innerText);
    let copyBtn = document.getElementById("copyBtn");
    copyBtn.innerText = "Copied!";
    setTimeout(() => { copyBtn.innerText = "Copy RNA"; }, 2000);
}

// Dark/Light Mode Toggle
document.getElementById("themeToggle").addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    document.getElementById("themeToggle").innerText = document.body.classList.contains("light-mode") ? "🌞 Light Mode" : "🌙 Dark Mode";
});

// Live Typing Conversion
document.getElementById("dnaInput").addEventListener("input", convertDNA);
