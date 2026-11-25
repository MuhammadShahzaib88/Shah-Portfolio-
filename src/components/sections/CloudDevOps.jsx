import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Activity,
  Check,
  CheckCircle2,
  Clock3,
  Cloud,
  Copy,
  Cpu,
  Database,
  HardDrive,
  Layers,
  MemoryStick,
  Server,
  Terminal,
  Users,
} from 'lucide-react'
import toast from 'react-hot-toast'
import SectionHeading from '../ui/SectionHeading'
import { useTheme } from '../../context/ThemeContext'
import './CloudDevOps.css'

const technologyIcons = {
  AWS: Cloud,
  Ubuntu: Cpu,
  Linux: Terminal,
  Docker: Layers,
  MySQL: Database,
}

const technologyColors = {
  AWS: '#f59e0b',
  Ubuntu: '#e95420',
  Linux: '#06b6d4',
  Docker: '#2496ed',
  MySQL: '#4479a1',
}

const projects = [
  {
    title: 'Dockerized Laravel Application on AWS EC2',
    description: 'Containerized an existing Laravel Jobs Portal and tested it on an Ubuntu EC2 instance.',
    objective: 'Run the application in separate PHP-FPM and Nginx containers while retaining its existing MySQL database connection.',
    icon: Layers,
    status: 'Completed · tested through SSH tunnel',
    technologies: ['AWS EC2', 'Ubuntu', 'Docker', 'Docker Compose', 'PHP 8.5', 'Laravel', 'Nginx', 'MySQL', 'Linux'],
    steps: [
      'Connected to EC2 using SSH and installed Docker and Docker Compose.',
      'Created a Laravel Dockerfile and a Docker Compose configuration for PHP-FPM and Nginx.',
      'Built the image, started and managed containers, and configured container-to-host networking for the existing MySQL database.',
      'Verified Laravel migrations and tested the application in a browser using SSH port forwarding.',
    ],
    result: 'Successfully running and tested locally through SSH port forwarding.',
    note: 'This was not a production cutover or public Docker deployment. The original website remains on its existing host configuration.',
  },
  {
    title: 'AWS EC2 Infrastructure Management',
    description: 'Practiced provisioning and managing an Ubuntu EC2 instance and its remote access.',
    objective: 'Get comfortable with key-based server access, basic resource inspection, and inbound network rules.',
    icon: Server,
    status: 'Completed · hands-on practice',
    technologies: ['AWS EC2', 'Ubuntu Linux', 'SSH', 'AWS Security Groups'],
    steps: [
      'Connected to the instance using SSH key authentication.',
      'Inspected system status and CPU, memory, and disk resources.',
      'Managed inbound security group rules for HTTP and SSH.',
    ],
    result: 'Practiced secure remote access and basic EC2 administration.',
  },
  {
    title: 'AWS EBS Storage Expansion and Linux Disk Management',
    description: 'Expanded an EC2 root volume and extended the Linux partition and filesystem.',
    objective: 'Make an increased EBS volume usable by the Ubuntu root filesystem.',
    icon: HardDrive,
    status: 'Completed · hands-on practice',
    technologies: ['AWS EBS', 'Ubuntu', 'Linux'],
    steps: [
      'Increased the EBS volume from 8 GiB to 20 GiB.',
      'Inspected block devices with lsblk and expanded the root partition with growpart.',
      'Resized the filesystem with resize2fs and checked available capacity with df -h.',
    ],
    result: 'Verified the expanded disk capacity from the Ubuntu instance.',
  },
  {
    title: 'Linux Swap Memory Management',
    description: 'Configured persistent swap memory on an AWS EC2 Ubuntu instance.',
    objective: 'Add a 2 GiB swap file and have it enabled across system restarts.',
    icon: MemoryStick,
    status: 'Completed · hands-on practice',
    technologies: ['Ubuntu Linux', 'Linux Memory Management', 'AWS EC2'],
    steps: [
      'Created a 2 GiB swap file and applied secure file permissions.',
      'Initialized it with mkswap and enabled it using swapon.',
      'Added a persistent entry to /etc/fstab and verified memory with free -h.',
    ],
    result: 'Verified swap availability and memory reporting on the instance.',
  },
]

const commandGroups = [
  {
    title: 'Navigation and files',
    icon: Terminal,
    commands: [
      ['pwd', 'Print the current working directory.'],
      ['cd', 'Change to another directory.'],
      ['ls', 'List files and directories.'],
      ['ls -la', 'List all entries, including hidden files and details.'],
      ['cat', 'Print a file to the terminal.'],
      ['nano', 'Edit a file in the Nano terminal editor.'],
      ['vim', 'Edit a file in the Vim terminal editor.'],
    ],
  },
  {
    title: 'System information',
    icon: Activity,
    commands: [
      ['uname', 'Display kernel and system information.'],
      ['date', 'Show the current system date and time.'],
      ['uptime', 'Show how long the system has been running and load averages.'],
      ['w', 'Show logged-in users and their current activity.'],
      ['who', 'List users currently logged in.'],
      ['whoami', 'Print the current user name.'],
      ['cat /etc/issue', 'Show the distribution identification banner.'],
      ['cat /etc/os-release', 'Show operating system release details.'],
    ],
  },
  {
    title: 'User and group management',
    icon: Users,
    commands: [
      ['useradd', 'Create a user account (commonly used with options).'],
      ['adduser', 'Create a user account with an interactive prompt.'],
      ['gpasswd', 'Manage group membership and group passwords.'],
      ['cat /etc/passwd', 'Read the local user account list.'],
      ['cat /etc/group', 'Read the local group list.'],
    ],
  },
  {
    title: 'Disk and memory',
    icon: HardDrive,
    commands: [
      ['lsblk', 'List block devices and their partitions.'],
      ['df -h', 'Show filesystem capacity in human-readable units.'],
      ['free -h', 'Show memory and swap usage in human-readable units.'],
      ['growpart', 'Grow a partition to use available device space.'],
      ['resize2fs', 'Resize an ext-family filesystem.'],
      ['mkswap', 'Set up a file or partition as Linux swap space.'],
      ['swapon', 'Enable a swap file or partition.'],
    ],
  },
  {
    title: 'Server, networking, and Docker',
    icon: Cloud,
    commands: [
      ['ssh -i <key.pem> ubuntu@<EC2_PUBLIC_IP>', 'Connect to an Ubuntu EC2 instance with an SSH key.'],
      ['curl <URL>', 'Make a request to a URL from the command line.'],
      ['ss -lnt', 'List listening TCP sockets and their ports.'],
      ['sudo systemctl <action> <service>', 'Manage or inspect a systemd service.'],
      ['docker --version', 'Print the installed Docker version.'],
      ['docker compose version', 'Print the Docker Compose version.'],
      ['sudo docker images', 'List locally available Docker images.'],
      ['sudo docker ps', 'List running Docker containers.'],
      ['sudo docker compose ps', 'List containers in the current Compose project.'],
      ['sudo docker compose build', 'Build or rebuild the Compose service images.'],
      ['sudo docker compose up -d', 'Create and start Compose services in the background.'],
      ['sudo docker compose exec app php artisan --version', 'Print the Laravel version inside the app container.'],
      ['sudo docker compose exec app php artisan migrate:status', 'Check migration status inside the app container.'],
      ['sudo docker compose logs', 'View logs from Compose services.'],
    ],
  },
]

const learningMilestones = [
  'Linux fundamentals',
  'Ubuntu server administration',
  'AWS EC2',
  'SSH remote access',
  'EBS storage management',
  'Swap memory management',
  'Docker fundamentals',
  'Docker Compose',
  'Laravel containerization',
  'Nginx and PHP-FPM',
  'MySQL connectivity',
  'Cloud deployment practices',
]

const devopsSkills = [
  { name: 'Linux and Ubuntu administration', stage: 'Practiced', level: 2 },
  { name: 'AWS EC2 and security groups', stage: 'Practiced', level: 2 },
  { name: 'EBS storage and Linux filesystems', stage: 'Applied', level: 3 },
  { name: 'Linux memory and swap', stage: 'Applied', level: 3 },
  { name: 'Docker and Docker Compose', stage: 'Applied', level: 3 },
  { name: 'Nginx, PHP-FPM, and MySQL connectivity', stage: 'Applied', level: 3 },
  { name: 'Cloud deployment practices', stage: 'Learning', level: 1 },
]

const TechBadge = ({ name }) => {
  const Icon = technologyIcons[name]

  return (
    <span className="cloud-tech-badge">
      {Icon && <Icon size={15} aria-hidden="true" style={{ color: technologyColors[name] }} />}
      {name}
    </span>
  )
}

const ProjectCard = ({ project, index, isDark }) => {
  const Icon = project.icon

  return (
    <motion.article
      className="cloud-project-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      whileHover={{ y: -5 }}
      style={{
        background: isDark ? 'rgba(255,255,255,0.035)' : 'rgba(255,255,255,0.8)',
        borderColor: isDark ? 'rgba(255,255,255,0.09)' : 'rgba(15,23,42,0.1)',
      }}
    >
      <div className="cloud-project-heading">
        <div className="cloud-project-icon"><Icon size={20} /></div>
        <span className="cloud-status"><CheckCircle2 size={13} /> {project.status}</span>
      </div>
      <h3>{project.title}</h3>
      <p className="cloud-project-description">{project.description}</p>
      <div className="cloud-project-objective">
        <span>Objective</span>
        <p>{project.objective}</p>
      </div>
      <div className="cloud-project-technologies">
        {project.technologies.map(tech => <TechBadge key={tech} name={tech} />)}
      </div>
      <div className="cloud-project-steps">
        <h4>Implementation</h4>
        <ul>
          {project.steps.map(step => (
            <li key={step}><Check size={14} /> <span>{step}</span></li>
          ))}
        </ul>
      </div>
      <div className="cloud-project-result">
        <strong>Result</strong>
        <p>{project.result}</p>
      </div>
      {project.note && <p className="cloud-project-note">{project.note}</p>}
    </motion.article>
  )
}

const CommandGroup = ({ group }) => {
  const Icon = group.icon

  const copyText = async text => {
    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error('Clipboard access is unavailable in this browser context.')
      }
      await navigator.clipboard.writeText(text)
      toast.success('Copied to clipboard')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Could not copy to clipboard.')
    }
  }

  return (
    <div className="cloud-command-group">
      <div className="cloud-command-group-heading">
        <h3><Icon size={17} /> {group.title}</h3>
        <button
          type="button"
          className="cloud-copy-all"
          onClick={() => copyText(group.commands.map(([command]) => command).join('\n'))}
          aria-label={`Copy all ${group.title} commands`}
        >
          <Copy size={14} /> Copy all
        </button>
      </div>
      <ul className="cloud-command-list">
        {group.commands.map(([command, description]) => (
          <li key={command}>
            <code>{command}</code>
            <span>{description}</span>
            <button
              type="button"
              onClick={() => copyText(command)}
              aria-label={`Copy ${command}`}
              title={`Copy ${command}`}
            >
              <Copy size={14} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

const CloudDevOps = () => {
  const { isDark } = useTheme()
  const [copied, setCopied] = useState(false)

  const copyLearningPath = async () => {
    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error('Clipboard access is unavailable in this browser context.')
      }
      await navigator.clipboard.writeText(learningMilestones.join('\n'))
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
      toast.success('Learning path copied')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Could not copy to clipboard.')
    }
  }

  return (
    <section
      id="cloud-devops"
      className="section-padding cloud-devops-section"
      style={{ background: isDark ? '#111111' : '#f8fafc' }}
    >
      <div className="container-custom relative z-10">
        <SectionHeading
          label="Cloud & DevOps"
          title={`Cloud & DevOps <span class="gradient-text">Engineering</span>`}
          subtitle="Hands-on projects and practical infrastructure experience."
        />

        <div className="cloud-learning-note">
          <Cloud size={18} />
          <p>These are practical learning projects. The Laravel container test was performed locally through an SSH tunnel; it was not a production cutover or public Docker deployment.</p>
        </div>

        <div className="cloud-project-grid">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} isDark={isDark} />
          ))}
        </div>

        <section className="cloud-subsection" aria-labelledby="cloud-skills-heading">
          <div className="cloud-subsection-heading">
            <span className="section-label">Current toolkit</span>
            <h3 id="cloud-skills-heading">DevOps skills in practice</h3>
            <p>Progress shows the current hands-on stage, not a proficiency score, certification, or professional experience claim.</p>
          </div>
          <div className="cloud-skills-grid">
            {devopsSkills.map(skill => (
              <div className="cloud-skill-card" key={skill.name}>
                <div className="cloud-skill-copy">
                  <span>{skill.name}</span>
                  <strong className={`cloud-skill-stage stage-${skill.level}`}>{skill.stage}</strong>
                </div>
                <div
                  className="cloud-skill-track"
                  role="img"
                  aria-label={`${skill.name}: ${skill.stage}`}
                >
                  {[1, 2, 3].map(step => (
                    <span key={step} className={step <= skill.level ? 'is-active' : ''} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="cloud-subsection" aria-labelledby="cloud-commands-heading">
          <div className="cloud-subsection-heading">
            <span className="section-label">Field notes</span>
            <h3 id="cloud-commands-heading">Linux & Docker command reference</h3>
            <p>Commands practiced during server administration and container work. Copy a command or a whole category.</p>
          </div>
          <div className="cloud-command-grid">
            {commandGroups.map(group => <CommandGroup key={group.title} group={group} />)}
          </div>
        </section>

        <section className="cloud-subsection cloud-learning-path" aria-labelledby="cloud-learning-heading">
          <div className="cloud-subsection-heading">
            <span className="section-label">Learning journey</span>
            <h3 id="cloud-learning-heading">From Linux fundamentals to cloud deployment</h3>
            <p>Completed practical topics are marked; cloud deployment practices remain an ongoing learning focus.</p>
          </div>
          <div className="cloud-timeline">
            {learningMilestones.map((milestone, index) => {
              const isOngoing = index === learningMilestones.length - 1
              return (
                <motion.div
                  className={`cloud-milestone ${isOngoing ? 'is-ongoing' : 'is-complete'}`}
                  key={milestone}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.025 }}
                >
                  <span className="cloud-milestone-icon">
                    {isOngoing ? <Clock3 size={15} /> : <Check size={15} />}
                  </span>
                  <span>{milestone}</span>
                  {isOngoing && <span className="cloud-ongoing-label">Ongoing</span>}
                </motion.div>
              )
            })}
          </div>
          <button type="button" className="cloud-copy-path" onClick={copyLearningPath}>
            {copied ? <Check size={15} /> : <Copy size={15} />}
            {copied ? 'Copied' : 'Copy learning path'}
          </button>
        </section>
      </div>
    </section>
  )
}

export default CloudDevOps
