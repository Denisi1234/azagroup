# azagroup

Static website with cPanel Git Version Control deployment.

## Connect cPanel once

1. In cPanel, open **Git Version Control > Create** and enable **Clone a Repository**.
2. Set the clone URL to `https://github.com/Denisi1234/azagroup.git`.
3. Choose a repository path outside your live website folder, for example
   `/home/YOUR_CPANEL_USERNAME/repositories/azagroup`.
4. Create the repository and use the `main` branch.
5. The deployment destination in `.cpanel.yml` is `$HOME/public_html`, the usual
   primary-domain document root. Check **cPanel > Domains > Document Root** before
   the first deployment. For an addon domain or a different document root, change
   `DEPLOYPATH` in `.cpanel.yml` to that folder and push the change to GitHub.

If the GitHub repository is private, configure cPanel's SSH access and a GitHub
deploy key before cloning with its SSH URL.

## Update the live website

After pushing changes to GitHub:

1. In **cPanel > Git Version Control**, click **Manage** for this repository.
2. Open **Pull or Deploy** and click **Update from Remote**. Wait for it to finish.
3. Click **Deploy HEAD Commit**.

cPanel runs `.cpanel.yml` to copy `index.html`, `assets/`, `css/`, and `js/` into
the document root. Repository metadata and this README are not published.
Existing files with matching names are overwritten; unrelated server files and
files removed from Git remain in place.

This is cPanel's manual pull deployment: pushing to GitHub alone does not update
the cPanel repository or the live website. **Update from Remote** retrieves the
latest code; **Deploy HEAD Commit** publishes that retrieved code.

Reference: [cPanel deployment guide](https://docs.cpanel.net/knowledge-base/web-services/guide-to-git-set-up-deployment/).
