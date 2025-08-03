import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

export interface PinnedRepo {
  name: string;
  description: string;
  url: string;
  stargazerCount: number;
  primaryLanguage: {
    name: string;
    color: string;
  };
}

@Injectable()
export class GithubService {
    private readonly logger = new Logger(GithubService.name);
    private readonly username: string;
    private readonly token: string;

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {
        const githubUsername = this.configService.get<string>('GITHUB_USERNAME');
        const githubToken = this.configService.get<string>('GITHUB_TOKEN');

        if(!githubUsername) throw new Error('Variável de ambiente GITHUB_USERNAME não definida.');
        if(!githubToken) throw new Error('Variável de ambiente GITHUB_TOKEN não definida');

        this.username = githubUsername;
        this.token = githubToken;
    }
    
    async getPinnedRepos(): Promise<PinnedRepo[]> {
        const query = `
            query {
                user(login: "${this.username}") {
                pinnedItems(first: 6, types: REPOSITORY) {
                    nodes {
                    ... on Repository {
                        name
                        description
                        url
                        stargazerCount
                        primaryLanguage {
                        name
                        color
                        }
                    }
                    }
                }
                }
            }
        `;

        try {
            const response = await firstValueFrom(
                this.httpService.post(
                'https://api.github.com/graphql',
                { query },
                {
                    headers: {
                    Authorization: `Bearer ${this.token}`,
                    },
                },
                ),
            );

            return response.data.data.user.pinnedItems.nodes;
        } catch (error) {
            this.logger.error('Falha ao buscar repositórios do GitHub', error.stack);
            return [];
        }
    }
}