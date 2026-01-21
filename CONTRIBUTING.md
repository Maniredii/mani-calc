# Contributing to Mani-Calc

Thank you for your interest in contributing to Mani-Calc! 🎉

## How to Contribute

### Reporting Bugs
1. Check if the bug has already been reported in [Issues](https://github.com/manireddy/mani-calc/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Your environment (Windows version, Node.js version)

### Suggesting Features
1. Check existing [Issues](https://github.com/manireddy/mani-calc/issues) for similar suggestions
2. Create a new issue with:
   - Clear description of the feature
   - Use cases and benefits
   - Possible implementation approach

### Code Contributions

#### Setup Development Environment
```bash
# Clone the repository
git clone https://github.com/manireddy/mani-calc.git
cd mani-calc

# Install dependencies
npm install

# Run tests
npm test

# Test locally
node bin/cli.js "2 + 3 * 5"
```

#### Making Changes
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass (`npm test`)
6. Commit with clear messages (`git commit -m 'Add amazing feature'`)
7. Push to your fork (`git push origin feature/amazing-feature`)
8. Open a Pull Request

#### Code Style
- Use clear, descriptive variable names
- Add comments for complex logic
- Follow existing code structure
- Keep functions focused and small
- Use ES6+ features where appropriate

#### Testing
- Add tests for new features
- Ensure existing tests pass
- Test on Windows 10/11
- Test both CLI and Windows Search integration

### Areas for Contribution

#### High Priority
- [ ] PowerToys Run plugin integration
- [ ] Advanced math functions
- [ ] Currency conversion (with offline rates)
- [ ] Date/time calculations

#### Medium Priority
- [ ] Graph plotting
- [ ] Step-by-step solutions
- [ ] Custom user commands
- [ ] Plugin system

#### Nice to Have
- [ ] Voice input support
- [ ] Themes for CLI
- [ ] Export history to CSV
- [ ] Sync history across devices

## Code of Conduct

### Our Standards
- Be respectful and inclusive
- Welcome newcomers
- Accept constructive criticism
- Focus on what's best for the community

### Unacceptable Behavior
- Harassment or discrimination
- Trolling or insulting comments
- Publishing others' private information
- Other unprofessional conduct

## Questions?

Feel free to:
- Open an issue for discussion
- Reach out to maintainers
- Check existing documentation

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for making Mani-Calc better!** 🚀
