import { useState, useRef } from 'react';
import { ArrowUpRight, Upload } from 'lucide-react';
import { Project } from '../types';
import { PROJECTS } from '../data/portfolioData';

interface ProjectSectionProps {
  onSelectProject: (project: Project) => void;
}

export default function ProjectSection({ onSelectProject }: ProjectSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const fileInputsRef = useRef<Record<string, HTMLInputElement | null>>({});

  const [uploadingId, setUploadingId] = useState<string | null>(null);

  const [customImages, setCustomImages] = useState<Record<string, string>>(() => {
    if (typeof window === 'undefined') return {};
    const res: Record<string, string> = {};
    try {
      const kpi = localStorage.getItem('project_image_kpi-dashboard');
      if (kpi && kpi.trim().length > 0) res['kpi-dashboard'] = kpi;
      const ecom = localStorage.getItem('project_image_ecommerce');
      if (ecom && ecom.trim().length > 0) res['ecommerce'] = ecom;
      const fash = localStorage.getItem('project_image_fashion-app');
      if (fash && fash.trim().length > 0) res['fashion-app'] = fash;
    } catch {
      // Safe fallback
    }
    return res;
  });

  const handleProjectImageUpload = async (projectId: string, file: File, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!file || !file.type.startsWith('image/')) return;
    setUploadingId(projectId);

    const reader = new FileReader();
    reader.onload = async (ev) => {
      const dataUrl = ev.target?.result as string;
      if (!dataUrl) {
        setUploadingId(null);
        return;
      }

      // Optimistic preview in React state
      setCustomImages((prev) => ({ ...prev, [projectId]: dataUrl }));

      const filename = projectId === 'ecommerce' 
        ? 'ecommerce.png' 
        : projectId === 'fashion-app' 
        ? 'fashion-app.png' 
        : `${projectId}.png`;

      try {
        const resp = await fetch('/api/upload-photo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ dataUrl, filename }),
        });
        const result = await resp.json();
        if (result.success && result.url) {
          setCustomImages((prev) => ({ ...prev, [projectId]: result.url }));
          try {
            // Save short URL to avoid localStorage quota limits
            localStorage.setItem(`project_image_${projectId}`, result.url);
          } catch {
            // Ignore quota errors
          }
        }
      } catch (err) {
        console.error('Failed to sync uploaded project image:', err);
        try {
          localStorage.setItem(`project_image_${projectId}`, dataUrl);
        } catch {
          // Ignore quota errors
        }
      } finally {
        setUploadingId(null);
      }
    };
    reader.onerror = () => {
      setUploadingId(null);
    };
    reader.readAsDataURL(file);
  };

  const categories = ['All', 'Web App & SaaS', 'E-Commerce', 'Mobile UI/UX', 'AI & Automation'];

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <section id="work" className="py-24 sm:py-32 border-t border-neutral-200 dark:border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div>
            <span className="font-mono text-xs tracking-widest uppercase text-neutral-400 dark:text-neutral-500 block mb-3">
              02 / SELECTED WORK
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-950 dark:text-white">
              Selected <br />
              <span className="italic font-normal">Work.</span>
            </h2>
          </div>

          <p className="text-base text-neutral-600 dark:text-neutral-400 max-w-sm font-normal leading-relaxed">
            A curated portfolio of digital products where systems architecture, typography, and AI come together to solve tangible business challenges.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 pb-10 border-b border-neutral-200 dark:border-neutral-800/80 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-sm'
                  : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => {
              const currentImg = customImages[project.id] || project.image;
              return (
                <article
                  key={project.id}
                  onClick={() => onSelectProject(project)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const file = e.dataTransfer.files?.[0];
                    if (file) handleProjectImageUpload(project.id, file);
                  }}
                  className="group cursor-pointer rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#0c0c0f] hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300 flex flex-col justify-between shadow-md hover:shadow-xl hover:-translate-y-1"
                >
                  {/* Hidden File Input */}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={(el) => {
                      fileInputsRef.current[project.id] = el;
                    }}
                    onClick={(e) => {
                      (e.target as HTMLInputElement).value = '';
                    }}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleProjectImageUpload(project.id, file);
                      e.target.value = '';
                    }}
                  />

                  {/* Visual Header */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                    <img
                      key={currentImg}
                      src={currentImg}
                      alt={project.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        if (project.id === 'ecommerce') {
                          e.currentTarget.src = '/ecommerce.png';
                        } else if (project.id === 'fashion-app') {
                          e.currentTarget.src = '/fashion-app.png';
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent opacity-80" />
                    
                    {/* Category Pill Over Image */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-black/60 text-white backdrop-blur-md border border-white/10">
                        {project.category}
                      </span>
                    </div>

                    {/* Upload button on card */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        fileInputsRef.current[project.id]?.click();
                      }}
                      title="Upload or replace image"
                      className="absolute top-4 right-4 px-2.5 py-1.5 rounded-lg text-xs font-mono bg-black/80 hover:bg-black text-white border border-white/25 backdrop-blur-md shadow-md opacity-90 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 z-20 cursor-pointer"
                    >
                      {uploadingId === project.id ? (
                        <span className="animate-pulse text-amber-300">Uploading...</span>
                      ) : (
                        <>
                          <Upload className="w-3 h-3" />
                          <span>Upload Image</span>
                        </>
                      )}
                    </button>

                    {/* Arrow Indicator */}
                    <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white text-neutral-950 flex items-center justify-center transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 shadow-lg pointer-events-none">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                {/* Details Section */}
                <div className="p-7 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 font-mono text-xs text-neutral-500 dark:text-neutral-400 mb-2.5">
                      <span>{project.number}</span>
                      <span>·</span>
                      <span>{project.category}</span>
                    </div>

                    <h3 className="font-display text-2xl font-bold text-neutral-950 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>

                    <p className="mt-2.5 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
                      {project.tagline}
                    </p>
                  </div>

                  {/* Tags & Action */}
                  <div className="pt-6 mt-6 border-t border-neutral-200 dark:border-neutral-800/80 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded text-[10px] font-mono bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white group-hover:underline underline-offset-4">
                      Explore
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
