export default function Footer() {
    return (
        <footer className="bg-black py-12 border-t border-white/10 relative z-20">
            <div className="max-w-7xl mx-auto px-6 md:px-20 flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                    <h2 className="text-2xl font-bold text-white">Niyas T K</h2>
                    <p className="text-white/50 text-sm mt-1">Software Engineer • Kerala, India</p>
                </div>

                <div className="flex gap-6">
                    <a href="mailto:niyastk9562@gmail.com" className="text-white/70 hover:text-white transition-colors">Email</a>
                    <a href="https://linkedin.com/in/niyas-t-k-59a30b200" className="text-white/70 hover:text-white transition-colors">LinkedIn</a>
                    <a href="https://github.com/Niyastk" className="text-white/70 hover:text-white transition-colors">GitHub</a>
                </div>
            </div>
        </footer>
    );
}
