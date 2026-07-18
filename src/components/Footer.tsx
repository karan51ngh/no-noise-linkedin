import { Heart, Star, UserRound } from 'lucide-react';
import chromeIcon from '../../images/brand-svgs/googlechrome.svg';
import firefoxIcon from '../../images/brand-svgs/firefoxbrowser.svg';

const SvgIcon = ({ src, size, title }: { src: string; size: number; title: string }) => {
    const maskUrl = src.startsWith('data:') || src.startsWith('http') || src.startsWith('chrome-extension:')
        ? src
        : chrome.runtime.getURL(src);
    return (
        <span
            className="nnl-cp-svg-icon"
            title={title}
            role="img"
            aria-label={title}
            style={{
                width: size,
                height: size,
                WebkitMaskImage: `url("${maskUrl}")`,
                maskImage: `url("${maskUrl}")`,
            }}
        />
    );
};

export default function Footer() {
    const isFirefox = navigator.userAgent.toLowerCase().includes('firefox');
    return (
        <div className="nnl-cp-section nnl-cp-footer">
            <div className="nnl-cp-desc">
                {/* <div className="nnl-cp-social-text">
                    Made by <a href="https://www.linkedin.com/in/karan51ngh/" target="_blank" rel="noopener noreferrer">@karan51ngh</a> with <Heart size={12} color="#ec4899" fill="#ec4899" strokeWidth={2.5} />
                </div> */}
            </div>
            <div className="nnl-cp-footer-content">
                {/* Project Actions (Pills) */}
                <div className="nnl-cp-pills">
                    <a
                        className="nnl-cp-pill"
                        href="https://github.com/karan51ngh/no-noise-linkedin"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Star this repo on GitHub"
                    >
                        <Star size={16} fill="currentColor" strokeWidth={2.5} />
                        <span>Star</span>
                    </a>
                    <a
                        className="nnl-cp-pill"
                        href={isFirefox
                            ? 'https://addons.mozilla.org/en-US/firefox/addon/no-noise-linkedin/'
                            : 'https://chromewebstore.google.com/detail/nonoise-linkedin/hbcjelfhlljdepmifggbmhnklhmdmldn/reviews'}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={isFirefox ? 'Install from Firefox Add-ons' : 'Write a review on Chrome Web Store'}
                    >
                        {isFirefox ? (<SvgIcon src={firefoxIcon} size={16} title="Firefox" />) : (<SvgIcon src={chromeIcon} size={16} title="Chrome" />)}
                        <span>Review</span>
                    </a>
                    <a
                        className="nnl-cp-pill"
                        href="https://karanbagga.com?utm_campaign=no-noise-linkedin"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <UserRound size={16} fill="currentColor" strokeWidth={2.5} />
                        <span>karanbagga.com</span>
                    </a>
                </div>
            </div>
        </div>
    );
}
