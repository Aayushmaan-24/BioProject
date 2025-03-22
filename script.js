// Full RNA Codon to Amino Acid Map
const codonToAminoAcid = {
    "UUU": "Phe", "UUC": "Phe", "UUA": "Leu", "UUG": "Leu",
    "CUU": "Leu", "CUC": "Leu", "CUA": "Leu", "CUG": "Leu",
    "AUU": "Ile", "AUC": "Ile", "AUA": "Ile", "AUG": "Met (Start)",
    "GUU": "Val", "GUC": "Val", "GUA": "Val", "GUG": "Val",
    "UCU": "Ser", "UCC": "Ser", "UCA": "Ser", "UCG": "Ser",
    "CCU": "Pro", "CCC": "Pro", "CCA": "Pro", "CCG": "Pro",
    "ACU": "Thr", "ACC": "Thr", "ACA": "Thr", "ACG": "Thr",
    "GCU": "Ala", "GCC": "Ala", "GCA": "Ala", "GCG": "Ala",
    "UAU": "Tyr", "UAC": "Tyr", "UAA": "STOP", "UAG": "STOP", "UGA": "STOP",
    "CAU": "His", "CAC": "His", "CAA": "Gln", "CAG": "Gln",
    "AAU": "Asn", "AAC": "Asn", "AAA": "Lys", "AAG": "Lys",
    "GAU": "Asp", "GAC": "Asp", "GAA": "Glu", "GAG": "Glu",
    "UGU": "Cys", "UGC": "Cys", "UGG": "Trp",
    "CGU": "Arg", "CGC": "Arg", "CGA": "Arg", "CGG": "Arg",
    "AGU": "Ser", "AGC": "Ser", "AGA": "Arg", "AGG": "Arg",
    "GGU": "Gly", "GGC": "Gly", "GGA": "Gly", "GGG": "Gly"
};

// Convert DNA to RNA and Generate Codons
function convertDNA() {
    let dnaSequence = document.getElementById("dnaInput").value.toUpperCase().trim();
    let rnaOutput = document.getElementById("rnaOutput");
    let codonList = document.getElementById("codonList");

    if (!/^[ATCG]+$/.test(dnaSequence)) {
        rnaOutput.innerText = "⚠️ Invalid DNA Sequence!";
        codonList.innerHTML = "";
        return;
    }

    let rnaSequence = dnaSequence.replace(/T/g, "U");
    rnaOutput.innerText = rnaSequence;

    // Generate Codons & Amino Acids
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
    codonList.innerHTML = codons.map((codon, index) => 
        `<li><span class="codon">${codon}</span> → <span class="amino">${aminoAcids[index]}</span></li>`
    ).join("");
}

// Copy RNA Sequence
function copyRNA() {
    let rnaText = document.getElementById("rnaOutput").innerText;
    if (rnaText.startsWith("⚠️")) return; // Prevent copying invalid output

    navigator.clipboard.writeText(rnaText);
    let copyBtn = document.getElementById("copyBtn");
    copyBtn.innerText = "✅ Copied!";
    copyBtn.classList.add("copied");

    setTimeout(() => {
        copyBtn.innerText = "📋 Copy RNA";
        copyBtn.classList.remove("copied");
    }, 2000);
}

// Dark/Light Mode Toggle
document.getElementById("themeToggle").addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    let themeBtn = document.getElementById("themeToggle");
    themeBtn.innerText = document.body.classList.contains("light-mode") ? "🌞 Light Mode" : "🌙 Dark Mode";
});

// Live Typing Conversion
document.getElementById("dnaInput").addEventListener("input", convertDNA);