import { Controller, Get } from '@nestjs/common';
import { GithubService, PinnedRepo } from './github.service';

@Controller('github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Get('pinned-repos')
  async getPinnedRepos(): Promise<PinnedRepo[]> {
    return this.githubService.getPinnedRepos();
  }
}